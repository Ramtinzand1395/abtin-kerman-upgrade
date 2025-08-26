import React, { useEffect, useState } from "react";
import BtnTow from "../utils/BtnTow";
import { useShopingcard } from "../context/ShopingCard";
import AddressModall from "./modalls/AddressModall";
import {
  // addOrderService,
  getUserInfoService,
  // zarinpalService,
} from "../../services/ApiServices";
// import { toast } from "react-toastify";
import { decodedUser, User } from "../../types";
import IncreaseproductBtn from "../utils/IncreaseproductBtn";
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";

const ShopingInfo: React.FC = () => {
  const { CardItems, cardQty, removeFromCard } = useShopingcard();
  const totalPrice = CardItems.reduce((total, cardItem) => {
    const price = cardItem.data.price;
    return total + price * cardItem.ItemQty;
  }, 0);
  const [OpenModal, setOpenModal] = useState(false);
  const [UserInfo, setUserInfo] = useState<User>({
    address: {
      plaque: "",
      unit: "",
      postalCode: "",
      address: "",
      city: "",
      provider: "",
    },
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    isAdmin: "",
    profile: "",
    _id: "",
  });
  const [Loadingdata, setLoadingdata] = useState(false);
  const user = localStorage.getItem("User") || "{}";
  const decodedToken = jwtDecode<decodedUser>(user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await getUserInfoService(decodedToken.userId);
        setUserInfo({
          ...data.user,
          address: {
            plaque: data.user.address?.plaque || "",
            unit: data.user.address?.unit || "",
            postalCode: data.user.address?.postalCode || "",
            address: data.user.address?.address || "",
            city: data.user.address?.city || "",
            provider: data.user.address?.provider || "",
          },
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          phone: data.user.phone || "",
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [Loadingdata]);
  // zarin
  const handleAddOrder = async () => {
    // try {
    //   const userId = decodedToken.userId;
    //   if (!userId) {
    //     return toast.error("برای ثبت سفارش اول وارد شوید.");
    //   }
    //   const { data } = await addOrderService({
    //     data: {
    //       CardItems,
    //       userId,
    //       totalPrice
    //     },
    //   });
    //   toast.success(data.message);
    //   localStorage.setItem("orderId" , data.orderId)
    //   const { data: zarin, status } = await zarinpalService(totalPrice , "desc" ,"https://kermanatari.ir/payment-callback" );
    //   console.log(zarin,"zarinres");
    //   console.log(status, "status");
    //   if (status === 200) {
    //     window.location.href = zarin.url;
    // }
    // } catch (err) {
    //   console.log(err);
    // }
    console.log("باید دیتا ی addorder درست بشه")
  };
  return (
    <div className="md:container md:mx-auto mx-2 my-5">
      <Helmet>
        <title>confirm address </title>
        <meta name="description" content="confirm address  page" />
      </Helmet>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-9 border-2 rounded-lg p-5 mb-10">
          <div className="border-2 mb-10 p-5 rounded-lg bg-white">
            <h3 className="text-gray-600 text-xs font-tanha">
              آدرس تحویل سفارش
            </h3>
            <p className="flex items-center my-5">
              <svg
                className="ml-5"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {UserInfo?.address
                ? UserInfo?.address?.address
                : "هنوز آدرسی وارد نشده"}
            </p>
            <div className="">
              اطلاعات تماس:{" "}
              {UserInfo?.phone ? UserInfo?.phone : "هنوز شماره تلفن وارد نشده"}
            </div>
            <button
              onClick={() => setOpenModal(true)}
              className="text-pretty text-blue-500 flex items-center justify-end w-full"
            >
              تغییر یا ویرایش آدرس
            </button>
          </div>
          <div className="border-2 mb-10 p-5 rounded-lg bg-white">
            <h3 className="text-gray-600 text-xs font-tanha">کد تخفیف</h3>
            <p> کد تخفیف</p>

            <input title="DiscountCode" type="text" className="border-2" />
            <button>اعمال کد</button>
          </div>
          <div className="grid grid-cols-6 gap-5 bg-white">
            {CardItems?.map((item) => (
              <div
                key={item.id}
                className=" p-2 text-white  font-tanha flex items-start w-full "
              >
                <div className="flex flex-col items-center h-72 ml-5">
                  <img
                    // src={`http://localhost:5000/${item.data.image.direction}`}
                    //! change
                    src={`${item.data.image.direction}`}
                    className="w-full h-full object-contain max-w-[100px] max-h-[100px]"
                    alt={item.data.image.imageName}
                  />
                  {item.SelectedPlatform === null ? (
                    <IncreaseproductBtn
                      id={item.id}
                      ItemQty={item.ItemQty}
                      SelectedPlatform={item.SelectedPlatform}
                      data={item.data}
                    />
                  ) : (
                    <svg
                      className="cursor-pointer bg-red-500 w-full p-2 mt-5"
                      onClick={() => removeFromCard(item.id)}
                      width="30px"
                      height="30px"
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
              </div>
            ))}
          </div>
        </div>
        <div className="fixed md:sticky md:top-20 self-start bottom-0 flex-row w-auto md:col-span-3 flex md:flex-col items-center border-2 rounded-lg mb-10 bg-white">
          <div className=" items-center justify-around my-5 text-gray-600 md:flex hidden w-full ">
            <p>قیمت کالا ها ({cardQty})</p>
            <p>{totalPrice} تومان</p>
          </div>
          <div className="flex items-center justify-around my-5  w-full md:text-base text-xs">
            <p> هزینه ارسال</p>

            <p>{totalPrice} تومان</p>
          </div>
          <div className="flex items-center justify-around my-5  w-full md:text-base text-xs">
            <p> جمع سبد خرید </p>

            <p>{totalPrice} تومان</p>
          </div>

          <BtnTow
            ButtonColor="bg-red-500 hover:from-red-500 hover:to-red-400 hover:ring-red-400 md:b-10 md:text-base text-xs my-5"
            ButtonText=" پرداخت"
            onClick={() => handleAddOrder()}
          />
        </div>
      </div>
      {OpenModal && UserInfo && (
        <AddressModall
          setOpenModal={setOpenModal}
          UserInfo={UserInfo}
          setLoadingdata={setLoadingdata}
          setUserInfo={setUserInfo}
        />
      )}
    </div>
  );
};

export default ShopingInfo;
