import { useEffect, useState } from "react";
import Spiner from "../../../utils/Spiner";
import {
  deleteGameList,
  getGameList,
  updateGameList,
} from "../../../../services/ApiServices";
import { GameItem } from "../../../../types";
import AddGameListModal from "./AddGameListModal";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";

const GameListPage = () => {
  const navigate = useNavigate();

  const [loadingGameList, setLoadingGameList] = useState(false);
  const [ps5List, setPs5List] = useState<GameItem[]>([]);
  const [ps4List, setPs4List] = useState<GameItem[]>([]);
  const [crackedList, setCrackedList] = useState<GameItem[]>([]);
  const [Xbox, setXbox] = useState<GameItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newGame, setnewGame] = useState<{
    _id: string;
    name: string;
    platform?: string;
  }>({
    _id: "",
    name: "",
    platform: "",
  });
  // const [searchTerm, setSearchTerm] = useState("");
  const [OpenModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoadingGameList(true);
        const { data } = await getGameList(page);
        setPs5List(data.ps5.items || []);
        setPs4List(data.ps4.items || []);
        setCrackedList(data.copy.items || []);
        setXbox(data.xbox.items || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingGameList(false);
      }
    };

    getData();
  }, [page, refresh]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    setPage(newPage);
  };

  const updateList = async () => {
    try {
      const { data } = await updateGameList(newGame);
      toast.success(data.message);
      const game = data.data;

      const updateArrayItem = (
        listSetter: React.Dispatch<React.SetStateAction<GameItem[]>>,
        list: GameItem[]
      ) => {
        const index = list.findIndex((i) => i._id === game._id);
        if (index !== -1) {
          listSetter((prev) => {
            const updated = [...prev];
            updated[index] = {
              ...updated[index],
              name: game.name,
              _id: game._id,
            };
            return updated;
          });
        }
      };
      if (game.platform === "xbox") {
        updateArrayItem(setXbox, Xbox);
      } else if (game.platform === "ps5") {
        updateArrayItem(setPs5List, ps5List);
      } else if (game.platform === "ps4") {
        updateArrayItem(setPs4List, ps4List);
      } else if (game.platform === "copy") {
        updateArrayItem(setCrackedList, crackedList);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setEditingId("");
    }
  };

  const handleEdite = (gameId: string, gameName: string) => {
    setEditingId(gameId);
    setnewGame({ _id: gameId, name: gameName });
  };

  const handleDelete = async (platform: string, gameId: string) => {
    const confirmChange = window.confirm(`آیا از تغییر وضعیت  مطمئن هستید؟`);
    if (!confirmChange) return;
    try {
      const { data } = await deleteGameList(platform, gameId);
      toast.success(data.message);
    } catch (err) {
      console.log(err);
    } finally {
      setRefresh((prev) => !prev);
    }
  };
  const renderTable = (
    title: string,
    platform: string,
    list: GameItem[] = []
  ) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <table className="min-w-full text-sm font-light text-surface border border-neutral-300">
        <thead className="border-b border-neutral-200 font-medium bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-start">نام بازی</th>
            <th className="px-4 py-2 text-start">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, idx) => (
            <tr key={idx} className="border-b border-neutral-200 text-xs">
              {editingId === item._id ? (
                <input
                  title="name"
                  type="text"
                  value={newGame.name}
                  onChange={(e) =>
                    setnewGame((prev) => ({
                      ...prev,
                      name: e.target.value,
                      platform,
                    }))
                  }
                  className="border px-2 py-1 w-full"
                />
              ) : (
                <td className="px-4 py-2">{item.name}</td>
              )}
              <td className="px-4 py-2 flex items-center">
                {editingId === item._id ? (
                  <button onClick={updateList} className="text-blue-600 ml-2">
                    ذخیره
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdite(item._id, item.name)}
                    className="text-blue-600 ml-2"
                  >
                    ویرایش
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item._id, platform)}
                  className="text-red-600"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="mx-2">
      <div className="flex items-center justify-between">
         <button
        onClick={() => setOpenModal(true)}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        افزودن بازی
      </button>
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline"
      >
        بازگشت
      </button>
      </div>
      {/* <div className="flex justify-start my-4">
        <input
          type="text"
          placeholder="جستجوی نام بازی..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full max-w-md"
        />
      </div> */}

      <div className="w-full md:container md:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-2 my-10">
        {renderTable("پلی استیشن 5", "ps5", ps5List)}
        {renderTable("پلی استیشن 4", "ps4", ps4List)}
        {renderTable("کپی خور", "copy", crackedList)}
        {renderTable("xbox", "xbox", Xbox)}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 my-8">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-1 border rounded bg-gray-200"
        >
          قبلی
        </button>
        {loadingGameList && <Spiner />}

        <span>صفحه {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-1 border rounded bg-gray-200"
        >
          بعدی
        </button>
      </div>

   
      {OpenModal && <AddGameListModal setOpenModal={setOpenModal} />}
    </div>
  );
};

export default GameListPage;
