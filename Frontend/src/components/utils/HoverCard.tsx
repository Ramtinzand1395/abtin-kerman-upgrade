import React from "react";
interface HoverCard {
  id: number;
  title: string;
  image1: string;
  image2: string;
}
interface HoverCardprops {
  card: HoverCard;
}
const HoverCard: React.FC<HoverCardprops> = ({ card }) => {
  return (
    <>
      {/* <div className=" h-[260px] lg:h-[300px] md:h-[400px]"> */}
      <div className="">
        <div>
          <div className="card">
            <div className="wrapper">
              <img
                title="cover-image"
                src={card.image1}
                className="cover-image rounded-2xl"
              />
            </div>
            <img title="character" src={card.image2} className="character " />
          </div>
        </div>
      </div>
    </>
  );
};

export default HoverCard;
