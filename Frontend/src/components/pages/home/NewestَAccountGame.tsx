import React, { useEffect, useState } from "react";
import Animations from "../../utils/Animations";
import LeftAnimation from "../../utils/LeftAnimation";
import { GameData } from "../../../types";
import { getGameService } from "../../../services/ApiServices";
import AccountsGames from "../../utils/AccountsGames";

const NewestَAccountGame: React.FC = () => {
  const [Games, setGames] = useState<GameData[]>([]);

  useEffect(() => {
    const getGames = async () => {
      try {
        const { data } = await getGameService(1, "newestFirst");
        setGames(data.games);
      } catch (err) {
        console.log(err);
      }
    };
    getGames();
  }, []);

  return (
    <div>
      <Animations>
        <div className="flex items-center mt-10 mb-2">
          <h2 className="font-bold text-lg lg:text-2xl whitespace-nowrap ml-5">
            جدید ترین بازی ها
          </h2>{" "}
          <div className="w-full h-[8px] rounded-3xl bg-primary"></div>{" "}
        </div>
      </Animations>
      <LeftAnimation>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 my-10 ">
          {Games?.length > 0 &&
            Games?.map((game) => (
              <AccountsGames
                primaryImage={game.primaryImage}
                additionalImages={game.additionalImages}
                title={game.title}
                info={game.info}
                _id={game._id}
                tags={game.tags}
                averageRating={game.averageRating}
                key={game._id}
              />
            ))}
        </div>
      </LeftAnimation>
    </div>
  );
};

export default NewestَAccountGame;
