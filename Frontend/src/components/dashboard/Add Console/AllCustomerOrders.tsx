import { customerOrder } from "../../../types";
import { useEffect, useState } from "react";
import { getAllOrders, searchAllOrders } from "../../../services/ApiServices";
import Spiner from "../../utils/Spiner";
import { useNavigate, useSearchParams } from "react-router-dom";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface Filters {
  startDate: string;
  endDate: string;
  page: number;
  totalPages: number;
  mobileSearch: string;
  lastNameSearch: string;
  [key: string]: string | number | string[];
}

const AllCustomerOrders = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [AllOrders, setAllOrders] = useState<customerOrder[]>([]);
  const [loadingOrders, setloadingOrders] = useState(false);
  const [OpenSearch, setOpenSearch] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    startDate: "",
    endDate: "",
    page: 1,
    totalPages: 0,
    mobileSearch: "",
    lastNameSearch: "",
  });

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      startDate: params.startDate || "",
      endDate: params.endDate || "",
      page: Number(params.page) || 1,
      totalPages: Number(params.totalPages) || 0,
      mobileSearch: params.mobileSearch || "",
      lastNameSearch: params.lastNameSearch || "",
    });
  }, [searchParams]);

  useEffect(() => {
    setloadingOrders(true);
    const getData = async () => {
      try {
        const { data } = await getAllOrders({
          page: filters.page,
          limit: 10,
        });

        setAllOrders(data.Data);
        setFilters((prev) => ({ ...prev, totalPages: data.pages }));
      } catch (err) {
        console.log(err);
      } finally {
        setloadingOrders(false);
      }
    };

    getData();
  }, [filters.filter, filters.page]);

  const fetchOrders = async () => {
    setloadingOrders(true);
    handleUrlChange();

    try {
      const { data } = await searchAllOrders({
        startDate: filters.startDate,
        endDate: filters.endDate,
        mobile: filters.mobileSearch,
        lastName: filters.lastNameSearch,
      });
      setAllOrders(data.Data);
      setFilters((prev) => ({ ...prev, totalPages: data.pages }));
    } catch (err) {
      console.log(err);
    } finally {
      setloadingOrders(false);
    }
  };

  const handleUrlChange = () => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (Array.isArray(filters[key]) && filters[key].length > 0) {
        params.append(key, filters[key].join(","));
      } else {
        params.append(key, String(filters[key]));
      }
    });
    navigate(`?${params.toString()}`);
  };

  if (loadingOrders) return <Spiner />;
  return (
    <div className=" w-full md:container md:mx-auto mx-2 my-10">
      <div className="flex items-center justify-between mx-2">
        <button
          onClick={() => setOpenSearch(!OpenSearch)}
          className="mr-4 p-2 bg-blue-500 text-white rounded-lg"
        >
          جستجو پیشرفته
        </button>

        <div className="">
          <button
            onClick={() => navigate("/dashboard/all-customer-orders")}
            className="text-blue-600 hover:underline"
          >
            بازگشت
          </button>
        </div>
      </div>
      {OpenSearch && (
        <div className="grid grid-cols-4 gap-5 my-4 bg-gray-200 p-4 rounded-lg">
          <div className="flex-col items-center">
            <label className="">تاریخ سفارش از</label>
            <DatePicker
              calendarPosition="bottom-left"
              inputClass="p-1 rounded-xl bg-white text-xs md:text-base border-2 border-gray-300 text-gray-700 my-1 "
              containerStyle={{ width: "100%" }}
              style={{
                minWidth: "150px",
              }}
              calendar={persian}
              locale={persian_fa}
              value={filters.endDate}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  endDate: e ? e.toString() : "",
                }));
                setFilters((prev) => ({ ...prev, page: 1 }));
              }}
            />
          </div>
          <div className="flex-col items-center">
            <label>تاریخ تا</label>
            <DatePicker
              calendarPosition="bottom-left"
              inputClass="p-1 rounded-xl bg-white text-xs md:text-base border-2 border-gray-300 text-gray-700 my-1 "
              containerStyle={{ width: "100%" }}
              style={{
                minWidth: "150px",
              }}
              calendar={persian}
              locale={persian_fa}
              value={filters.startDate}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  startDate: e ? e.toString() : "",
                }));
                setFilters((prev) => ({ ...prev, page: 1 }));
              }}
            />
          </div>
          <div className="flex-col flex items-start">
            <label>شماره موبایل</label>
            <input
              title="شماره موبایل"
              className="p-1 rounded-xl bg-white text-xs md:text-base border-2 border-gray-300 text-gray-700 my-1 "
              type="text"
              name=""
              id=""
              value={filters.mobileSearch}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  mobileSearch: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex-col flex items-start">
            <label> نام خانوادگی</label>
            <input
              title="نام خانوادگی"
              className="p-1 rounded-xl bg-white text-xs md:text-base border-2 border-gray-300 text-gray-700 my-1 "
              type="text"
              name=""
              id=""
              value={filters.lastNameSearch}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  lastNameSearch: e.target.value,
                }))
              }
            />
          </div>
          <div className="">
            <button
              onClick={() => {
                setFilters((prev) => ({ ...prev, page: 1 }));
                fetchOrders();
              }}
              className=" p-2 text-sm bg-blue-500 text-white rounded-lg"
            >
              جستجو
            </button>
            <button
              onClick={() => {
                setFilters({
                  filter: "all",
                  startDate: "",
                  endDate: "",
                  page: 1,
                  totalPages: 0,
                  mobileSearch: "",
                  lastNameSearch: "",
                });
                navigate("/dashboard/all-customer-orders/table"); // پاکسازی URL
              }}
              className=" p-2 bg-gray-500 text-xs mr-5 text-white rounded-lg"
            >
              پاک کردن فیلتر ها
            </button>
          </div>
        </div>
      )}
      <table className="min-w-full  text-sm font-light text-surface my-10">
        <thead className="border-b border-neutral-200 font-medium ">
          <tr>
            <th scope="col" className="px-6 py-4 text-start">
              نام خانوادگی
            </th>
            <th scope="col" className="px-6 py-4 text-start">
              موبایل
            </th>
            <th scope="col" className="px-6 py-4 text-start">
              دستگاه
            </th>
            <th scope="col" className="px-6 py-4 text-start">
              لیست
            </th>
            <th scope="col" className="px-6 py-4 text-start">
              تاریخ سفارش
            </th>
            <th scope="col" className="px-6 py-4 text-start">
              تاریخ تحویل
            </th>
            <th scope="col" className="px-6 py-4 text-start">
              قیمت
            </th>
            <th scope="col" className="px-6 py-4 text-start">
              توضیحات
            </th>
          </tr>
        </thead>
        <tbody>
          {AllOrders?.map((order) => (
            <tr
              key={order._id}
              className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 text-start "
            >
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {typeof order.customer === "object" &&
                "lastName" in order.customer
                  ? order.customer.lastName
                  : "نامشخص"}
              </td>{" "}
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {typeof order.customer === "object" &&
                "lastName" in order.customer
                  ? order.customer.mobile
                  : "نامشخص"}
              </td>{" "}
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {order.consoleType}
              </td>{" "}
              <td className="px-6 py-4 font-medium align-top">
                <div className=" flex flex-col text-xs gap-1 pr-1">
                  {order.list.map((list, idx) => (
                    <span key={idx} className="break-words">
                      {list}
                    </span>
                  ))}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {order.persianDate}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {order.deliveryDate}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {order.price}
              </td>
              <td className={`whitespace-nowrap p-2 text-xs font-medium `}>
                {order?.description ? order.description : "توضیحاتی وجود ندارد"}
                {/* {console.log(order)} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center my-4 gap-2">
        <button
          disabled={filters.page === 1}
          className="bg-gray-200 px-4 py-1 rounded disabled:opacity-50"
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page: Math.max(prev.page - 1, 1),
            }))
          }
        >
          قبلی
        </button>

        <span className="px-4 py-1">
          {filters.page} / {filters.totalPages}
        </span>
        <button
          disabled={filters.page === filters.totalPages}
          className="bg-gray-200 px-4 py-1 rounded disabled:opacity-50"
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page: Math.min(prev.page + 1, prev.totalPages),
            }))
          }
        >
          بعدی
        </button>
      </div>
    </div>
  );
};

export default AllCustomerOrders;
