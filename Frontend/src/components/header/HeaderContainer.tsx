import React, { useEffect, useState } from "react";
import Topheader from "./Topheader";
import { FaUser } from "react-icons/fa";
import CenterHederMobile from "./CenterHederMobile";
import CenterHederMonitor from "./CenterHederMonitor";
import MonitorMenu from "./MonitorMenu";
import MobileMenu from "./MobileMenu";
import { decodedUser } from "../../types";
import { jwtDecode } from "jwt-decode";
import { useShopingcard } from "../context/ShopingCard";

const HeaderContainer: React.FC = () => {
  const token = localStorage.getItem("User");

  const [OpenMenu, setOpenMenu] = useState(false);
  const [isLogedIn, setisLogedIn] = useState(false);
  const [OpenModall, setOpenModall] = useState(false);
  const [User, setUser] = useState<string | null>(token);
  const [decodedUser, setdecodedUser] = useState<decodedUser | null>(null);

  useEffect(() => {
    if (token) {
      setisLogedIn(true);
      return;
    } else {
      setisLogedIn(false);
    }
  }, [User, token]);

  useEffect(() => {
    if (User && typeof User === "string") {
      try {
        const decodedToken = jwtDecode<decodedUser>(User);
        setdecodedUser(decodedToken);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setdecodedUser(null);
      }
    } else {
      setdecodedUser(null);
    }
  }, [User]);

  const DropdownIthem = {
    text1: "ورود به داشبورد",
    icon1: (
      <svg
        fill="#000000"
        width="15px"
        height="15px"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.642 20.669c-0.391 0.39-0.391 1.023-0 1.414 0.195 0.195 0.451 0.293 0.707 0.293s0.512-0.098 0.707-0.293l5.907-6.063-5.907-6.063c-0.39-0.39-1.023-0.39-1.414 0s-0.391 1.024 0 1.414l3.617 3.617h-19.264c-0.552 0-1 0.448-1 1s0.448 1 1 1h19.326zM30.005 0h-18c-1.105 0-2.001 0.895-2.001 2v9h2.014v-7.78c0-0.668 0.542-1.21 1.21-1.21h15.522c0.669 0 1.21 0.542 1.21 1.21l0.032 25.572c0 0.668-0.541 1.21-1.21 1.21h-15.553c-0.668 0-1.21-0.542-1.21-1.21v-7.824l-2.014 0.003v9.030c0 1.105 0.896 2 2.001 2h18c1.105 0 2-0.895 2-2v-28c-0.001-1.105-0.896-2-2-2z"></path>
      </svg>
    ),
    link1: User
      ? decodedUser?.isAdmin
        ? `/dashboard/${decodedUser?.userId}`
        : `/dashboard/userInfo/${decodedUser?.userId}`
      : "/login",
    text2: "ویرایش حساب کاربری",
    icon2: (
      <svg
        width="15px"
        height="15px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title />
        <g id="Complete">
          <g id="edit">
            <g>
              <path
                d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
                fill="none"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <polygon
                fill="none"
                points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </g>
          </g>
        </g>
      </svg>
    ),
    text4: "خروج از حساب",
    icon4: (
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.25 5.25L9 4.5H18L18.75 5.25V18.75L18 19.5H9L8.25 18.75V16.5H9.75V18H17.25V6H9.75V7.5H8.25V5.25Z"
          fill="#080341"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.06068 12.7499L14.25 12.7499L14.25 11.2499L7.06068 11.2499L8.78035 9.53027L7.71969 8.46961L4.18936 11.9999L7.71969 15.5303L8.78035 14.4696L7.06068 12.7499Z"
          fill="#080341"
        />
      </svg>
    ),
    link4: "exite",
    title: (<FaUser />),
  };

  const { setOpenMiniShoppingcard, cardQty, OpenMiniShoppingcard } =
    useShopingcard();

  return (
    <div className="bg-white">
      <div className=" hidden md:block">
        <Topheader />
      </div>
      <div className="block md:hidden relative">
        <CenterHederMobile
          setOpenMenu={setOpenMenu}
          setOpenMiniShoppingcard={setOpenMiniShoppingcard}
          cardQty={cardQty}
          OpenMiniShoppingcard={OpenMiniShoppingcard}
        />
      </div>
      <div className=" hidden md:block">
        <CenterHederMonitor />
      </div>

      <div className="block md:hidden">
        <MobileMenu
          isLogedIn={isLogedIn}
          setOpenModall={setOpenModall}
          OpenModall={OpenModall}
          setUser={setUser}
          DropdownIthem={DropdownIthem}
          setOpenMenu={setOpenMenu}
          OpenMenu={OpenMenu}
        />
      </div>

      <div className=" hidden md:block">
        <MonitorMenu
          isLogedIn={isLogedIn}
          setOpenModall={setOpenModall}
          OpenModall={OpenModall}
          setUser={setUser}
          DropdownIthem={DropdownIthem}
          setOpenMiniShoppingcard={setOpenMiniShoppingcard}
          cardQty={cardQty}
          OpenMiniShoppingcard={OpenMiniShoppingcard}
        />
      </div>
    </div>
  );
};

export default HeaderContainer;
