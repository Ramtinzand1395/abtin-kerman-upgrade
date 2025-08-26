import React from "react";
import HoverCard from "../../utils/HoverCard";
import hover1 from "../../../assets/Hover/Fc-Hover.png";
import hover2 from "../../../assets/Hover/FC_correct.jpg";
import hover3 from "../../../assets/Hover/GodOfWar_Hover.png";
import hover4 from "../../../assets/Hover/GodOfWar-Correct.jpg";
import hover5 from "../../../assets/Hover/Spider-man_Hover.png";
import hover6 from "../../../assets/Hover/Spider-man.jpg";
import hover7 from "../../../assets/Hover/Wukong_hover.png";
import hover8 from "../../../assets/Hover/Wukong_Correct.jpg";

import Animations from "../../utils/Animations";
import LeftAnimation from "../../utils/LeftAnimation";

const MostSell: React.FC = () => {
  const hovercars = [
    {
      id: 1,
      title: "Fc",
      image1: hover2,
      image2: hover1,
    },
    {
      id: 2,
      title: " GodOfWar",
      image1: hover4,
      image2: hover3,
    },
    {
      id: 3,
      title: "Spider-man",
      image1: hover6,
      image2: hover5,
    },
    {
      id: 4,
      title: "Wukong",
      image1: hover8,
      image2: hover7,
    },
  ];
  return (
    <div>
      <Animations>
        <div className="flex items-center mt-10 mb-2">
          <h2 className="font-bold text-lg lg:text-2xl whitespace-nowrap ml-5">
            بازی های پر فروش
          </h2>{" "}
          <div className="w-full h-[8px] rounded-3xl bg-primary"></div>{" "}
        </div>
      </Animations>
      <LeftAnimation>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-5 ">
          {hovercars?.map((card) => (
            <HoverCard key={card.id} card={card} />
          ))}
        </div>
      </LeftAnimation>
    </div>
  );
};

export default MostSell;
