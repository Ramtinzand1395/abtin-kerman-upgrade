import React from "react";
import { useShopingcard } from "../context/ShopingCard";
import { Feature, ImageType, SelectedPlatform, Tag } from "../../types";

interface cardItem {
  id: string;
  ItemQty: number;
  SelectedPlatform: null | SelectedPlatform;
  data: data;
}
interface data {
  title: string;
  image: ImageType;
  price: number;
  features: Feature[];
  tags: Tag[];
  mainQty: number;
}
const IncreaseproductBtn: React.FC< cardItem> = ({
  id,
  ItemQty,
  data
}) => {
  const { removeFromCard, DecreaseCardQty, InceraseCardQty } = useShopingcard();

  return (
    <div className="flex items-center justify-around border-2 rounded-lg py-2 w-32 bg-white">
      {ItemQty < data.mainQty ? (
        <svg
          className="cursor-pointer text-secondery"
          onClick={() =>
            InceraseCardQty(id, null, {
              title: "",
              image: {
                imageName: "",
                direction: "",
                createdAt: "",
                _id: "",
              },
              price: 0,
              features: [],
              mainQty: 0,
              tags: [],
            })
          }
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12H18M12 6V18"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <p className="text-red-500 font-bold">حداکثر</p>
      )}

      <span className=" text-secondery">{ItemQty}</span>
      {ItemQty === 1 ? (
        <svg
          className="cursor-pointer text-secondery"
          onClick={() => removeFromCard(id)}
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M20.5 6H3.49988"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M9.5 11L10 16"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M14.5 11L14 16"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          className="cursor-pointer text-secondery"
          onClick={() => DecreaseCardQty(id)}
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12L18 12"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default IncreaseproductBtn;
