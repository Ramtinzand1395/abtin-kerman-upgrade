import React, { useEffect, useState } from "react";
import { User } from "../../../types";

import AddressInfoModall from "./AddressInfoModall";
import GetGoogleAddressModall from "./GetGoogleAddressModall";

import GetUserInformation from "./GetUserInformation";
interface AddressModallProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingdata: React.Dispatch<React.SetStateAction<boolean>>;
  UserInfo: User;
  setUserInfo: React.Dispatch<React.SetStateAction<User>>;
}

const AddressModall: React.FC<AddressModallProps> = ({
  setOpenModal,
  UserInfo,
  setLoadingdata,
  setUserInfo,
}) => {
  const [OpenChange, setOpenChange] = useState(false);
  const [OpenInfo, setOpenInfo] = useState(false);

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Re-enable body scroll when the modal is closed
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div
      onClick={() => setOpenModal(false)}
      className="bg-gray-700 bg-opacity-60 z-10 w-full h-full fixed top-0 left-0 flex items-center justify-center"
    >
      <div
        className={` w-[80vw] h-[90vh] overflow-y-auto rounded-2xl bg-white px-10`}
        onClick={handleModalClick}
      >
        <div className="flex items-center justify-between static top-0">
          <button
            className="flex items-center text-[#1E8EFF]"
          >
            انتخاب آدرس
          </button>
          <svg
            className="cursor-pointer m-4 "
            onClick={() => setOpenModal(false)}
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z"
              fill="#292D32"
            />
          </svg>
        </div>
        {OpenChange ? (
          <GetGoogleAddressModall
            setOpenInfo={setOpenInfo}
            setOpenChange={setOpenChange}
            setUserInfo={setUserInfo}
          />
        ) : OpenInfo ? (
          <GetUserInformation
            UserInfo={UserInfo}
            setLoadingdata={setLoadingdata}
            setUserInfo={setUserInfo}
            setOpenChange={setOpenChange}
            setOpenModal={setOpenModal}
          />
        ) : (
          <AddressInfoModall
            setOpenChange={setOpenChange}
            UserInfo={UserInfo}
          />
        )}
      </div>
    </div>
  );
};

export default AddressModall;
