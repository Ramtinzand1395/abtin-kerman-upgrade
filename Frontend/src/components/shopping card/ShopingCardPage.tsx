import React, { useState } from "react";
import BtnTow from "../utils/BtnTow";
import { useShopingcard } from "../context/ShopingCard";
import ConnectedProducts from "../utils/ConnectedProducts";
import { useNavigate } from "react-router-dom";
import IncreaseproductBtn from "../utils/IncreaseproductBtn";
import { toast } from "react-toastify";
import LoginModall from "../loginModall/LoginModall";

const ShopingCardPage: React.FC = () => {
  const { CardItems, cardQty,removeFromCard } = useShopingcard();
  const totalPrice = CardItems.reduce((total, cardItem) => {
    const price = cardItem.data.price;
    return total + price * cardItem.ItemQty;
  }, 0);
  const navigate = useNavigate();
  const [OpenLoginModall, setOpenLoginModall] = useState(false);
  const [User, setUser] = useState(localStorage.getItem("User"));
  const handleFinish = () => {
    if (User) {
      navigate("/checkout/cart/info");
    } else {
      toast.error("باید وارد حساب کابری خود بشید.");
      setOpenLoginModall(true);
    }
  };
  return (
    <div className="md:container md:mx-auto mx-2 my-5">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-9 border-2 rounded-lg p-5 mb-10 bg-white">
          <p className=" mb-2">سبد خرید</p>
          <span className="font-tanha text-gray-300">{cardQty} کالا</span>
          <div className="flex flex-col ">
            {CardItems?.map((item) => (
              <div
                key={item.id}
                className=" p-2 text-white  font-tanha flex items-start w-full border-b-2"
              >
                <div className="flex flex-col items-center justify-between h-72 ml-5">
                  <img
                    // src={`http://localhost:5000/${item.data.image.direction}`}
                    //! change
                    src={`${item.data.image.direction}`}
                    className="w-full h-full object-contain max-w-[15vw] max-h-[15vw]"
                    alt={item.data.image.imageName}
                  />
                  {item.SelectedPlatform === null ? (
                    <IncreaseproductBtn id={item.id} 
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
                <div className="flex flex-col ite justify-between h-64">
                  <h3 className="text-black font-bold">{item.data.title}</h3>
                  <div className="flex flex-col">
                    {item?.data?.features?.map((Specification) => (
                      <span className="text-gray-500 text-sm mb-2">
                        {Specification.key} {Specification.value}
                      </span>
                    ))}
                  </div>
                  <p className="text-black">
                    {item?.data?.price && item?.data?.price * item.ItemQty}{" "}
                    تومان
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed md:sticky md:top-20 self-start bottom-0 flex-row w-auto md:col-span-3 flex md:flex-col items-center border-2 rounded-lg mb-10 bg-white">
          <div className=" items-center justify-around my-10 text-gray-600 md:flex hidden w-full ">
            <p>قیمت کالا ها ({cardQty})</p>
            <p>{totalPrice} تومان</p>
          </div>
          <div className="flex items-center justify-around my-10  w-full md:text-base text-xs">
            <p> جمع سبد خرید </p>
            <p>{totalPrice} تومان</p>
          </div>
          <BtnTow
            ButtonColor="bg-red-500 hover:from-red-500 hover:to-red-400 hover:ring-red-400 md:b-10 md:text-base text-xs my-5"
            ButtonText=" تایید و تکمیل سفارش "
            onClick={() => handleFinish()}
          />
        </div>
      </div>
      <ConnectedProducts />
      {OpenLoginModall && (
        <LoginModall setOpenModall={setOpenLoginModall} setUser={setUser} />
      )}
    </div>
  );
};

export default ShopingCardPage;
