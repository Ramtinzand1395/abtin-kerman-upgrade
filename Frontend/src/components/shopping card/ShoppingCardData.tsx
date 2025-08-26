import React from "react";
import { Link } from "react-router-dom";
import BtnTow from "../utils/BtnTow";
import { useShopingcard } from "../context/ShopingCard";
import IncreaseproductBtn from "../utils/IncreaseproductBtn";

const ShoppingCardData: React.FC = () => {
  const { CardItems, setOpenMiniShoppingcard ,removeFromCard } = useShopingcard();
  const totalPrice = CardItems.reduce((total, cardItem) => {
    const price = cardItem.data.price;
    return total + price * cardItem.ItemQty;
  }, 0);

  return (
    <div className="flex flex-col ">
      {CardItems?.map((item) => (
        <div
          key={item.id}
          className="h-72 border-b-2 p-2 text-white  font-tanha flex rounded-lg"
        >
          <div className="flex flex-col items-center justify-around">
            <img
              // src={`http://localhost:5000/${item.data.image.direction}`}
              //! change
              src={`${item.data.image.direction}`}
              className="w-40 h-auto"
              alt={item.data.image.imageName}
            />
            {item.SelectedPlatform === null ? (
              <IncreaseproductBtn    id={item.id} 
              ItemQty={item.ItemQty} 
              SelectedPlatform={item.SelectedPlatform} 
              data={item.data}  />
            ) : (
              <svg
              className="cursor-pointer bg-red-500 w-full p-2"
              onClick={() => removeFromCard(item.id)}
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M20.5 6H3.49988"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M9.5 11L10 16"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M14.5 11L14 16"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            )}
          </div>

          <div className="mr-5 flex flex-col items-start justify-between h-full">
            <div className="">
              <h4 className="text-black mb-2">{item.data.title}</h4>
              <div className="flex flex-col">
                {item?.data?.features?.map((Specification) => (
                  <span className="text-gray-500 text-sm mb-2">
                    {Specification.key} {Specification.value}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-black mb-10">
              {item.data.price * item.ItemQty} تومان
            </p>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-around sticky bg-white w-auto  py-2 z-20 bottom-0">
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 mb-2">مجموع قابل پرداخت</p>
          <span className="font-semibold">{totalPrice}</span>
        </div>
        <Link to={"/checkout/cart/"}>
          <BtnTow
            ButtonColor="bg-blue-500 hover:from-blue-500 hover:to-blue-400 hover:ring-blue-400"
            ButtonText="تکمیل خرید"
            onClick={() => setOpenMiniShoppingcard(false)}
          />
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCardData;
