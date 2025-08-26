import React, { useEffect, useState } from "react";
import {
  deleteGameService,
  getGameService,
} from "../../../../services/ApiServices";
import { GameData } from "../../../../types";
import BtnTow from "../../../utils/BtnTow";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import EditeGameModall from "./editeGame/EditeGameModall";
// import Spiner from "../../../utils/Spiner";

const GamesTable: React.FC = () => {
  const [Games, setGames] = useState<GameData[]>([]);
  const [orderDesc, setOrderDesc] = useState("newestFirst");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [LodaingGames, setLodaingGames] = useState(false);
  const [OpenModall, setOpenModall] = useState(false);
  const [SelectedProduct, setSelectedProduct] = useState<GameData>(Games[0]);
  const handleOpenModall = (product: GameData) => {
    setOpenModall(true);
    setSelectedProduct(product);
  };
  useEffect(() => {
    const getGames = async () => {
      try {
        const { data } = await getGameService(pageNumber, orderDesc);
        console.log(data)
        setGames(data.games);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.log(err);
      } 
    };
    getGames();
  }, [orderDesc, pageNumber , LodaingGames]);
  // !ادیت گیم حذف بشه و مدال اضافه بشه
  const handleDeleteGame = async (id: string) => {
    setLodaingGames(true);
    try {
      const { data } = await deleteGameService(id);
      toast.success(data.message);
    } catch (err) {
      console.log(err);
    } finally {
      setLodaingGames(false);
    }
  };
  //  ? DELETE
  const confirmAlertmodall = (game: GameData) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-primary border-2 rounded-2xl p-4 border-white w-[50vw] h-auto">
            <p className="text-white font-vazir my-5 ">
              از حذف
              <span className="text-red-400 font-bold text-xl">
                {" "}
                {game.title}{" "}
              </span>
              مطمعنی؟
            </p>
            <button
              onClick={() => {
                game._id && handleDeleteGame(game._id);
                onClose();
              }}
              className="bg-green-500 rounded-lg py-2 px-10 border-white border-2 text-black hover:bg-green-400 ml-5"
            >
              بله
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 rounded-lg py-2 px-10 border-white border-2 text-black hover:bg-red-400 ml-5"
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };
  // if (LodaingGames === true)  <Spiner />;
  return (
    <div className="w-full md:container md:mx-auto mx-2 my-10">
      <select title="Order" onChange={(e) => setOrderDesc(e.target.value)}>
        <option value="newestFirst">جدیدترین</option>
        <option value="oldestFirst">قدیمی ترین</option>
      </select>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light text-surface ">
              <thead className="border-b border-neutral-200 font-medium ">
                <tr>
                  <th scope="col" className="px-6 py-4 text-start">
                    اسم بازی
                  </th>
                  <th scope="col" className="px-6 py-4 text-start">
                    ظرفیت ها
                  </th>
                  <th scope="col" className="px-6 py-4 text-start">
                    تگ ها
                  </th>
                  <th scope="col" className="px-6 py-4 text-start">
                    دسته بندی
                  </th>
                  <th scope="col" className="px-6 py-4 text-start">
                    تغییرات
                  </th>
                </tr>
              </thead>
              <tbody>
                {Games?.map((data) => (
                  <tr
                    key={data._id}
                    className="border-b text-start border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100  "
                  >
                    <td className="whitespace-nowrap font-bold px-6 py-4 ">
                      <div className="flex items-center">
                        <img
                          // src={`http://localhost:5000/${data.primaryImage?.direction}`}
                          //! change
                          src={`${data.primaryImage?.direction}`}
                          className="w-14 h-14 rounded-lg ml-5"
                          alt=""
                        />
                        {data.title}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 flex flex-col">
                      {data.info.map((infodata, index) => (
                        <div
                          key={index}
                          className="mb-2"
                        >{`پلتفورم:${infodata.platform} - ظرفیت: ${infodata.capacity} - قیمت:${infodata.price} - تعداد: ${infodata.qty} `}</div>
                      ))}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {data.tags.map((tag) => (
                        <div key={tag._id} className="mb-2">
                          {tag.tagName}
                        </div>
                      ))}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {data.categories.map((cat) => (
                        <div key={cat._id} className="mb-2">
                          {cat.categoryName}
                        </div>
                      ))}
                    </td>
                    <td className="flex items-center justify-around">
                      <BtnTow
                        ButtonColor="bg-red-500 hover:from-red-500 hover:to-red-400 hover:ring-red-400"
                        ButtonText={"حذف"}
                        onClick={() => confirmAlertmodall(data)}
                      />
                      <BtnTow
                        ButtonColor="bg-orange-500 hover:from-orange-500 hover:to-orange-400 hover:ring-orange-400"
                        ButtonText={"ویرایش"}
                        onClick={() => handleOpenModall(data)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <nav aria-label="Page navigation example">
        <ul className="list-style-none flex">
          <li>
            <button
              className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 ${
                pageNumber === 1 ? "pointer-events-none text-surface/50" : ""
              }`}
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index}>
              <button
                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 ${
                  pageNumber === index + 1
                    ? "bg-primary-100 font-medium text-primary-700"
                    : ""
                }`}
                onClick={() => setPageNumber(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 ${
                pageNumber === totalPages
                  ? "pointer-events-none text-surface/50"
                  : ""
              }`}
              onClick={() =>
                setPageNumber((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      {OpenModall && SelectedProduct && (
        <EditeGameModall
          SelectedProduct={SelectedProduct}
          setSelectedProduct={setSelectedProduct}
          setOpenModall={setOpenModall}
          setLodaingGames={setLodaingGames}
        />
      )}
    </div>
  );
};

export default GamesTable;
