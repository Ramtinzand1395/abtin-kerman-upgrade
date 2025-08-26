import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SearchProducts from "./SearchProducts";
import { MenuData } from "./menuData";
import LoginDropDown from "../utils/LoginDropDown";
import LoginModall from "../loginModall/LoginModall";

const OpenMenuVariant = {
  hidden: {
    width: "0vw",
    transitionEnd: {
      display: "none",
    },
    opacity: 0,
  },
  visible: {
    display: "block",
    opacity: 1,
    width: "60vw",
    transition: { duration: 0.5, type: "tween" },
  },
};

const headerVariant = {
  hidden: {
    transitionEnd: {
      display: "none",
    },
    opacity: 0,
  },
  visible: {
    display: "block",
    opacity: 1,
    transition: { duration: 0.5, type: "tween" },
  },
};

interface MobileMenuProps {
  OpenMenu: boolean;
  setOpenMenu: (open: boolean) => void;
  isLogedIn: boolean;
  setOpenModall: React.Dispatch<React.SetStateAction<boolean>>;
  OpenModall: boolean;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  DropdownIthem: DropdownItem;
}
interface DropdownItem {
  text1: string;
  icon1: React.ReactNode; // Assuming this is a component type for icons
  link1: string;
  text2: string;
  icon2: React.ReactNode; // Assuming this is a component type for icons
  text4: string;
  icon4: React.ReactNode; // Assuming this is a component type for icons
  link4: string;
  title:  React.ReactNode;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  setOpenMenu,
  OpenMenu,
  isLogedIn,
  setOpenModall,
  OpenModall,
  setUser,
  DropdownIthem,
}) => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  return (
    <div className="text-xs md:text-base">
      <motion.div
        initial="hidden"
        animate={OpenMenu ? "visible" : "hidden"}
        variants={OpenMenuVariant}
        className="bg-white border-l-2 border-black px-4 h-[100vh] fixed overflow-y-auto top-0 right-0 z-20"
      >
        <div className="flex items-center justify-between my-4">
          <h4>منو</h4>
          <svg
            onClick={() => setOpenMenu(false)}
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
        <div className="my-5">
            <SearchProducts />
        
        </div>
        <div className="my-5">
          {isLogedIn ? (
            <div className="">
              <LoginDropDown
                setUser={setUser}
                DropdownIthem={DropdownIthem}
                setOpenModall={setOpenModall}
              />
            </div>
          ) : (
            <div className="flex items-center justify-between min-w-[20vw]">
              <div className="flex items-center">
                <svg
                  className="ml-5"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="9"
                    r="3"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p
                  onClick={() => setOpenModall(true)}
                  className={`cursor-pointer whitespace-nowrap `}
                >
                  ورود/ثبت نام
                </p>
              </div>
            </div>
          )}
        </div>
        <ul className="flex flex-col ">
          <Link to={"/"}>
            <li className="flex items-center mb-4 text-base justify-between w-32">
              <div className="flex items-center">
                <svg
                  width="15px"
                  height="15px"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2"
                >
                  <path
                    d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
                    fill="#6b7280"
                  />
                </svg>
                خانه
              </div>
            </li>
          </Link>
          {MenuData.map((menuItem, index) => (
            <li
              key={index}
              onClick={() => setIsHovered(isHovered === index ? null : index)}
              className="cursor-pointer"
            >
              <button className="flex items-center mb-4 text-base justify-between w-full">
                <div className="flex items-center">
                  <span className="ml-2">{menuItem.icon}</span>
                  {menuItem.title}
                </div>
                <svg
                  width="10px"
                  height="10px"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
                    fill="#000000"
                  />
                </svg>
              </button>
              <motion.div
                initial="hidden"
                animate={isHovered === index ? "visible" : "hidden"}
                variants={headerVariant}
                className="cursor-pointer"
              >
                <div className={`flex flex-col items-start justify-around`}>
                  {menuItem.items.map((subMenu, subIndex) => (
                    <ul key={subIndex}>
                      <li className="font-bold font-tanha my-3 text-secondery">
                        {subMenu.title}
                      </li>
                      {subMenu.options.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-gray-600 mb-2 hover:text-primary hover:scale-105"
                        >
                          <Link
                            onClick={() => setOpenMenu(false)}
                            to={item.link}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </motion.div>
            </li>
          ))}
        </ul>
        <div className="mt-5 mx-2 md:mx-10">
          <p className="font-bold text-primary">
            برای تهیه بازی به صورت آفلاین برای ایکس باکس یا پلی استیشن به صورت
            حضوری مراجعه فرمایید.
          </p>
        </div>

        {OpenModall && (
          <LoginModall setUser={setUser} setOpenModall={setOpenModall} />
        )}
      </motion.div>
    </div>
  );
};

export default MobileMenu;
