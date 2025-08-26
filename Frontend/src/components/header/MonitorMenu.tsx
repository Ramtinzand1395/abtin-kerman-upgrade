import React, { useEffect, useState } from "react";
import LoginModall from "../loginModall/LoginModall";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LoginDropDown from "../utils/LoginDropDown";
import MiniShoppingCard from "../shopping card/MiniShoppingCard";
import { MenuData } from "./menuData";
const headerVariant = {
  hidden: {
    opacity: 0,

    height: "0vh",
    transitionEnd: {
      display: "none",
    },
  },
  visible: {
    display: "block",
    opacity: 1,
    height: "30vh",
    transition: { duration: 0.5, type: "tween" },
  },
};
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
interface MonitorMenuProps {
  isLogedIn: boolean;
  setOpenModall: React.Dispatch<React.SetStateAction<boolean>>;
  OpenModall: boolean;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  DropdownIthem: DropdownItem;
  setOpenMiniShoppingcard: React.Dispatch<React.SetStateAction<boolean>>;
  cardQty: number;
  OpenMiniShoppingcard: boolean;
}

const MonitorMenu: React.FC<MonitorMenuProps> = ({
  isLogedIn,
  setOpenModall,
  OpenModall,
  setUser,
  DropdownIthem,
  setOpenMiniShoppingcard,
  cardQty,
  OpenMiniShoppingcard,
}) => {
  const [isHovered, setIsHovered] = useState({
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
  });
  const [StickyNavbar, setStickyNavbar] = useState(false);
  const ChangeNavbar = () => {
    if (window.scrollY >= 500) {
      setStickyNavbar(true);
    } else {
      setStickyNavbar(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", ChangeNavbar);
    return () => {
      window.removeEventListener("scroll", ChangeNavbar);
    };
  }, []);

  return (
    <div
      className={`flex items-center  justify-between border-b-2  border-black ${
        StickyNavbar
          ? "fixed top-0 my-0 py-2 z-20 bg-primary text-white w-full"
          : "block "
      }`}
    >
      {/* menu */}
      <ul className="flex items-center mx-2 w-full whitespace-nowrap relative">
        <Link
          className={`flex items-center ${
            StickyNavbar ? "text-white" : "text-gray-500 "
          }`}
          to={"/"}
        >
          <svg
            width="15px"
            height="15px"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
              fill="#6b7280"
            />
          </svg>
          <li className="cursor-pointer mr-2 ">خانه</li>
        </Link>
        {MenuData.map((data) => (
          <li
            key={data.id}
            onMouseEnter={() => setIsHovered({ ...isHovered, [data.id]: true })}
            onMouseLeave={() =>
              setIsHovered({ ...isHovered, [data.id]: false })
            }
            className="cursor-pointer mr-10"
          >
            <button
              className={`flex items-center ${
                StickyNavbar ? "text-white" : "text-gray-500 "
              }`}
              title="menu"
              type="button"
            >
              <span className="ml-2">{data.icon}</span>
              {data.title}
            </button>
            <motion.div
              initial="hidden"
              animate={
                isHovered[data.id as keyof typeof isHovered]
                  ? "visible"
                  : "hidden"
              }
              variants={headerVariant}
              className="bg-white border-b-2 border-gray-600 w-[95vw] absolute right-0 top-9 z-20 cursor-pointer"
            >
              <div className="flex items-start justify-around">
                {data.items.map((item, index) => (
                  <ul key={index}>
                    <li className="font-bold font-tanha my-3 text-secondery">
                      {item.title}
                    </li>
                    {item.options.map((option, i) => (
                      <li
                        key={i}
                        className="text-gray-600 mb-2 hover:text-primary hover:scale-105"
                      >
                        <Link to={option.link}>{option.label}</Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </motion.div>
          </li>
        ))}
      </ul>
      {isLogedIn ? (
        <div className="">
          <LoginDropDown
            setUser={setUser}
            DropdownIthem={DropdownIthem}
            setOpenModall={setOpenModall}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between">
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
                stroke={`${StickyNavbar ? "#fff" : "#000"}`}
                strokeWidth="1.5"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke={`${StickyNavbar ? "#fff" : "#000"}`}
                strokeWidth="1.5"
              />
              <path
                d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                stroke={`${StickyNavbar ? "#fff" : "#000"}`}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            <p
              onClick={() => setOpenModall(true)}
              className={`cursor-pointer whitespace-nowrap ${
                StickyNavbar ? "text-white" : "text-black"
              }`}
            >
              ورود/ثبت نام
            </p>
          </div>
        </div>
      )}
      <div className="flex items-center relative">
        <button
          onClick={() => setOpenMiniShoppingcard(true)}
          className="relative text-white py-3 rounded-lg text-sm uppercase ml-2 mr-10 font-semibold tracking-tight overflow-visible"
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.5285 6C16.5098 5.9193 16.4904 5.83842 16.4701 5.75746C16.2061 4.70138 15.7904 3.55383 15.1125 2.65C14.4135 1.71802 13.3929 1 12 1C10.6071 1 9.58648 1.71802 8.88749 2.65C8.20962 3.55383 7.79387 4.70138 7.52985 5.75747C7.50961 5.83842 7.49016 5.9193 7.47145 6H5.8711C4.29171 6 2.98281 7.22455 2.87775 8.80044L2.14441 19.8004C2.02898 21.532 3.40238 23 5.13777 23H18.8622C20.5976 23 21.971 21.532 21.8556 19.8004L21.1222 8.80044C21.0172 7.22455 19.7083 6 18.1289 6H16.5285ZM8 11C8.57298 11 8.99806 10.5684 9.00001 9.99817C9.00016 9.97438 9.00044 9.9506 9.00084 9.92682C9.00172 9.87413 9.00351 9.79455 9.00718 9.69194C9.01451 9.48652 9.0293 9.18999 9.05905 8.83304C9.08015 8.57976 9.10858 8.29862 9.14674 8H14.8533C14.8914 8.29862 14.9198 8.57976 14.941 8.83305C14.9707 9.18999 14.9855 9.48652 14.9928 9.69194C14.9965 9.79455 14.9983 9.87413 14.9992 9.92682C14.9996 9.95134 14.9999 9.97587 15 10.0004C15 10.0004 15 11 16 11C17 11 17 9.99866 17 9.99866C16.9999 9.9636 16.9995 9.92854 16.9989 9.89349C16.9978 9.829 16.9957 9.7367 16.9915 9.62056C16.9833 9.38848 16.9668 9.06001 16.934 8.66695C16.917 8.46202 16.8953 8.23812 16.8679 8H18.1289C18.6554 8 19.0917 8.40818 19.1267 8.93348L19.86 19.9335C19.8985 20.5107 19.4407 21 18.8622 21H5.13777C4.55931 21 4.10151 20.5107 4.13998 19.9335L4.87332 8.93348C4.90834 8.40818 5.34464 8 5.8711 8H7.13208C7.10465 8.23812 7.08303 8.46202 7.06595 8.66696C7.0332 9.06001 7.01674 9.38848 7.00845 9.62056C7.0043 9.7367 7.00219 9.829 7.00112 9.89349C7.00054 9.92785 7.00011 9.96221 7 9.99658C6.99924 10.5672 7.42833 11 8 11ZM9.53352 6H14.4665C14.2353 5.15322 13.921 4.39466 13.5125 3.85C13.0865 3.28198 12.6071 3 12 3C11.3929 3 10.9135 3.28198 10.4875 3.85C10.079 4.39466 9.76472 5.15322 9.53352 6Z"
              fill={`${StickyNavbar ? "#fff" : "#000"}`}
            />
          </svg>

          <div className="absolute -top-2 left-5 px-2.5 py-0.5 bg-red-500 rounded-full text-xs">
            {cardQty}
          </div>
        </button>
        {OpenMiniShoppingcard && (
          <MiniShoppingCard setOpenMiniShoppingcard={setOpenMiniShoppingcard} />
        )}
      </div>

      {OpenModall && (
        <LoginModall setUser={setUser} setOpenModall={setOpenModall} />
      )}
    </div>
  );
};

export default MonitorMenu;
