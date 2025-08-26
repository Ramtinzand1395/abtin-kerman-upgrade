import React from "react";
import { Link } from "react-router-dom";
interface CardItemProps {
  OpenTag?: boolean;
  OpenDiscount?: boolean;
  discount?: number;
  title: string;
  price: number;
  btnText: string;
  image: string;
}
const Card: React.FC<CardItemProps> = ({
  title,
  price,
  btnText,
  OpenTag,
  OpenDiscount,
  discount,
  image,
}) => {
  return (
    <Link to={`/product/${title}`}>
      <div className="bg-gray-300 rounded-md h-[60vh] flex flex-col items-center  p-2 relative ">
        {OpenTag && (
          <div className="absolute top-0 right-0 font-normal text-xs text-white">
            <div className="bg-teal-500 w-auto h-auto py-1 px-3">
              <span>تضمین کیفیت</span>
            </div>
            {OpenDiscount && (
              <div className="bg-red-400 w-auto h-auto py-1 px-3 my-3 text-center">
                <span>{discount} درصد</span>
              </div>
            )}
          </div>
        )}
        {/* img */}
        <img src={image} className="w-full h-[25vh]" alt="" />
        {/* title */}
        <div className="flex items-center justify-between flex-col text-center h-full">
          <h3 className="font-bold text-lg my-5">{title}</h3>
          <p>{price}تومان</p>
          <button className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white">
            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
            <span className="relative">{btnText}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
