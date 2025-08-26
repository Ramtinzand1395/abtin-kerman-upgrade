import * as Yup from "yup";

import React from "react";
import { addUserInfoService } from "../../../services/ApiServices";
import { toast } from "react-toastify";
import { User } from "../../../types";
import BtnTow from "../../utils/BtnTow";
import { userInfoValidationSchema } from "../../../validations/UserInfoValidation";
interface GetUserInformationProps {
  UserInfo: User;
  setLoadingdata: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<User>>;
  setOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const GetUserInformation: React.FC<GetUserInformationProps> = ({
  UserInfo,
  setUserInfo,
  setLoadingdata,
  setOpenChange,
  setOpenModal,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setUserInfo((prevInfo) => {
      if (prevInfo.address && name in prevInfo.address) {
        return {
          ...prevInfo,
          address: {
            ...prevInfo.address,
            [name]: value,
          },
        };
      } else {
        return {
          ...prevInfo,
          [name]: value,
        };
      }
    });
  };
  const handleAddUserInf = async () => {
    setLoadingdata(true);
    try {
      await userInfoValidationSchema.validate(UserInfo, { abortEarly: false });

      const { data } = await addUserInfoService({
        userInfo: UserInfo,
        userId: UserInfo._id,
      });
      toast.success(data.message);
      setLoadingdata(false);
      setOpenModal(false);
    } catch (err) {
      console.log(err);
      if (err instanceof Yup.ValidationError) {
        const errorMessages = err.inner.reduce((acc, error) => {
          acc[error.path as keyof User] = error.message;
          return acc;
        }, {} as Partial<Record<keyof User, string>>);
        Object.values(errorMessages).forEach((message) => toast.error(message));
      }
    }
  };
  return (
    <div>
      <div className="border-b-2">
        <h5>نشانی پستی</h5>
        <textarea
          title="address"
          value={UserInfo.address?.address}
          onChange={handleChange}
          name="address"
          className="border-2 w-full my-2 p-3 rounded-lg"
        >
          {UserInfo.address?.address}
        </textarea>
        <button
          onClick={() => setOpenChange(true)}
          className="text-secondery flex items-center mb-2"
        >
          <svg
            className="ml-5"
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM12 7.83335C12 7.4963 12.2088 7.19244 12.5291 7.06346C12.8494 6.93447 13.2181 7.00577 13.4632 7.2441L17.7489 11.4107C18.0837 11.7362 18.0837 12.2638 17.7489 12.5893L13.4632 16.7559C13.2181 16.9942 12.8494 17.0655 12.5291 16.9365C12.2088 16.8076 12 16.5037 12 16.1666V14H7C6.44771 14 6 13.5523 6 13V11C6 10.4477 6.44771 10 7 10H12V7.83335Z"
              fill="#1E8EFF"
            />
          </svg>
          اصلاح موقیت مکانی روی نقشه
        </button>
      </div>
      <div className="border-b-2 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 mb-4 ">
          <div className="">استان {UserInfo.address?.city}</div>
          <div className="">شهر {UserInfo.address?.provider}</div>
        </div>

        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-5">
          <div className="flex flex-col">
            <label htmlFor="">پلاک</label>
            <input
              value={UserInfo.address?.plaque}
              onChange={handleChange}
              id="plaque"
              title="plaque"
              name="plaque"
              type="text"
              className="px-2 border-2 rounded-lg text-subtitle py-5 lg:py-2 w-full rounded-medium"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">واحد</label>
            <input
              id="unit"
              name="unit"
              type="text"
              title="unit"
              className="px-2 border-2 rounded-lg text-subtitle py-5 lg:py-2 w-full rounded-medium"
              value={UserInfo.address?.unit}
              onChange={handleChange}
            />
          </div>{" "}
          <div className="">
            <label htmlFor="">کد پستی</label>
            <input
              id="postalCode"
              name="postalCode"
              className="px-2 border-2 rounded-lg text-subtitle w-full py-5 lg:py-2 rounded-medium"
              placeholder="کد پستی ده رقمی بدون خط"
              type="text"
              value={UserInfo.address?.postalCode}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* نام و نام خانوادگی */}
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="">
          <label htmlFor="">نام</label>
          <input
            id="firstName"
            name="firstName"
            className="px-2 border-2 rounded-lg text-subtitle w-full py-5 lg:py-2 rounded-medium"
            placeholder="علی"
            type="text"
            value={UserInfo?.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label htmlFor="">نام خانوادگی </label>
          <input
            id="lastName"
            name="lastName"
            className="px-2 border-2 rounded-lg text-subtitle w-full py-5 lg:py-2 rounded-medium"
            placeholder="حسینی"
            type="text"
            value={UserInfo?.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label htmlFor="phone">شماره موبایل</label>
          <input
            id="phone"
            name="phone"
            className="px-2 border-2 rounded-lg text-subtitle w-full py-5 lg:py-2 rounded-medium"
            placeholder="0913******85"
            type="text"
            value={UserInfo?.phone}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* دکمه */}
      <div className="sticky bottom-0 bg-white flex items-center  p-2 border-t-2">
        {/* <button onClick={() => handleAddUserInf()} className="bg-red-400 p-2">
          ثبت آدرس
        </button> */}
        <BtnTow
          ButtonColor="bg-green-500 hover:from-green-500 hover:to-green-400 hover:ring-green-400 font-bold text-2xl"
          ButtonText=" ثبت سفارش"
          onClick={() => handleAddUserInf()}
        />
      </div>
    </div>
  );
};

export default GetUserInformation;
