import { useState, useEffect, useMemo } from "react";
import { customerOrder } from "../../../types";
import { getAllGameList } from "../../../services/ApiServices";
import Spiner from "../../utils/Spiner";

interface GameDropdownProps {
  userOrder: customerOrder | null;
  setUserOrder: React.Dispatch<React.SetStateAction<customerOrder | null>>;
}
interface Game {
  name: string;
  // add other properties for a game if necessary
}

interface GameData {
  items: Game[];
}
const GameDropdownEdite: React.FC<GameDropdownProps> = ({
  userOrder,
  setUserOrder,
}) => {
  const [search, setSearch] = useState("");
  const [GameData, setGameData] = useState<GameData>({ items: [] });
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    const getdata = async () => {
      try {
        if (userOrder?.consoleType) {
          const { data } = await getAllGameList(userOrder.consoleType);
          setGameData(data.gameList[0]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setloading(false);
      }
    };
    getdata();
  }, [userOrder?.consoleType]);
  // Ensure items is always an array before calling filter
  const filteredGames = useMemo(() => {
    return GameData?.items?.filter((game) =>
      game.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, GameData]);

  return (
    <div className="relative max-w-52">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`جستجو ${userOrder?.consoleType}`}
        className="w-full p-2 border rounded-xl mt-1"
      />
      {loading ? (
        <Spiner />
      ) : (
        search &&
        filteredGames?.length > 0 && (
          <div className="mt-2 space-y-1 absolute top-12 left-0 bg-white border shadow-md z-10 w-full max-h-60 overflow-auto">
            {filteredGames?.map((game, index) => (
              <div
                key={index}
                onClick={() => {
                  setUserOrder((prevOrder) => {
                    if (!prevOrder) return prevOrder; // یا می‌تونی return null هم بنویسی
                    // if (!prevOrder.list.includes(game))
                    {
                      return {
                        ...prevOrder,
                        list: [...(prevOrder?.list ?? []), game.name],
                      };
                    }
                    return prevOrder;
                  });
                  setSearch("");
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {game.name}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default GameDropdownEdite;
