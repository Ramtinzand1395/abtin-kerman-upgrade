import { useEffect, useState } from "react";
import OrderTable from "../Add Console/OrderTable";
import AddOrderModal from "../Add Console/AddOrderModal";
import Spiner from "../../utils/Spiner";
import { customerOrder } from "../../../types";
import { getAllCustomersOrders } from "../../../services/ApiServices";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const AddCustomerOrder = () => {
  const [OpenAddItem, setOpenAddItem] = useState(false);
  const [filter, setFilter] = useState("all");
  const [loadingOrders, setloadingOrders] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOpenModal = () => {
    setOpenAddItem(!OpenAddItem);
  };
  const [Orders, setOrders] = useState<customerOrder[]>([]);

  useEffect(() => {
    setloadingOrders(true);
    const getData = async () => {
      try {
        const { data } = await getAllCustomersOrders(filter);
        setOrders(data.Data);
        setloadingOrders(false);
      } catch (err) {
        console.log(err);
      } finally {
        setloadingOrders(false);
      }
    };

    getData();
  }, [filter]);
  const Token = localStorage.getItem("User");

  let decodedToken: { email: string; role: string; userId: string } | null =
    null;

  if (Token) {
    decodedToken = jwtDecode(Token);
  }

  // Filter by consoleType
  const ps5Orders = Orders.filter((order) => order.consoleType === "ps5").sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const ps4Orders = Orders.filter((order) => order.consoleType === "ps4").sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const hackedOrders = Orders.filter(
    (order) => order.consoleType === "copy"
  ).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const xbox = Orders.filter((order) => order.consoleType === "xbox").sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  if (loadingOrders) return <Spiner />;
  return (
    <div className="container mx-auto my-10">
      <div className="flex items-center justify-around md:justify-between mb-2">
        <select
          title="filter"
          className="p-2 rounded-xl bg-white text-xs md:text-base border-2 text-gray-700"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">همه</option>
          <option value="آماده">آماده</option>
          <option value="دریافت از مشتری">دریافت از مشتری</option>
        </select>

        <div className="relative inline-block text-left">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex justify-center w-full rounded-xl border-2 border-gray-700 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300"
          >
            عملیات سفارش
            <svg
              className="-mr-1 ml-2 h-5 w-5 transition-transform duration-300"
              style={{
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div
              className="origin-top-left absolute left-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 
                     animate-dropdown-open"
            >
              <div className="py-1 flex flex-col">
                <button
                  onClick={() => {
                    handleOpenModal();
                    setDropdownOpen(false);
                  }}
                  className="text-gray-700 hover:bg-blue-100 block px-4 py-2 text-sm text-right transition duration-200"
                >
                  ثبت سفارش جدید
                </button>

                <NavLink
                  to={"/dashboard/game-list"}
                  className="text-gray-700 hover:bg-blue-100 block px-4 py-2 text-sm text-right transition duration-200"
                >
                  همه بازی ها
                </NavLink>
                {decodedToken?.role === "superAdmin" ? (
                  <NavLink
                    to={"/dashboard/all-customer-orders/table"}
                    className="text-gray-700 hover:bg-blue-100 block px-4 py-2 text-sm text-right transition duration-200"
                  >
                    همه سفارش‌ها
                  </NavLink>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </div>

        {OpenAddItem && (
          <AddOrderModal
            OpenAddItem={OpenAddItem}
            setOpenAddItem={setOpenAddItem}
            setOrders={setOrders}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-5 md:gap-2">
        <div className="bg-white shadow-md rounded-lg p-5">
          <OrderTable
            header={"پلی استیشن 5"}
            Orders={ps5Orders}
            setOrders={setOrders}
            setFilter={setFilter}
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-5">
          <OrderTable
            header={"پلی استیشن 4"}
            Orders={ps4Orders}
            setOrders={setOrders}
            setFilter={setFilter}
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-5">
          <OrderTable
            header={"  کپی خور"}
            Orders={hackedOrders}
            setOrders={setOrders}
            setFilter={setFilter}
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-5">
          <OrderTable
            header={"Xbox"}
            Orders={xbox}
            setOrders={setOrders}
            setFilter={setFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCustomerOrder;
