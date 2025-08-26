import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

interface OptionProps {
  text: string;
  Icon: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  link: string;
}
interface DropdownProps {
  DropdownIthem: {
    icon1: React.ReactNode;
    text1: string;
    icon2: React.ReactNode;
    text2: string;
    icon4: React.ReactNode;
    text4: string;
    title: React.ReactNode;
    link1: string;
    link4: string;
  };
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  setOpenModall: React.Dispatch<React.SetStateAction<boolean>>;
}
const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
const LoginDropDown: React.FC<DropdownProps> = ({
  DropdownIthem,
  setUser,
  setOpenModall,
}) => {
  const [open, setOpen] = useState(false);
  const Option: React.FC<OptionProps> = ({ text, Icon, setOpen, link }) => {
    return (
      <motion.li
        variants={itemVariants}
        onClick={() => setOpen(false)}
        className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
      >
        <motion.span variants={actionIconVariants}>{Icon}</motion.span>
        {link === "exite" ? (
          <span
            onClick={() => {
              googleLogout();
              localStorage.removeItem("User");
              localStorage.removeItem("shopping-card");
              setUser(null);
              setOpenModall(false);
            }}
          >
            {text}
          </span>
        ) : (
          <Link to={link}>
            <span>{text}</span>
          </Link>
        )}
      </motion.li>
    );
  };
  return (
    <div className=" flex items-center  bg-white">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 border-2 border-black p-1 rounded-md text-black bg-white hover:bg-secondery hover:text-white transition-colors duration-200"
        >
          <span className="font-medium text-sm whitespace-nowrap">
            {DropdownIthem.title}
          </span>
          <motion.span
            variants={iconVariants}
            className="text-black hover:text-white transition-colors duration-200"
          >
            <svg
              fill="currentColor"
              width="30px"
              height="30px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M759.2 419.8L697.4 358 512 543.4 326.6 358l-61.8 61.8L512 667z" />
            </svg>
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute z-20 origin-top-left top-10 md:left-20 -left-8 w-48 overflow-hidden"
        >
          <Option
            setOpen={setOpen}
            Icon={DropdownIthem.icon1}
            text={DropdownIthem.text1}
            link={DropdownIthem.link1}
          />
          <Option
            setOpen={setOpen}
            Icon={DropdownIthem.icon2}
            text={DropdownIthem.text2}
            link={DropdownIthem.link1}
          />

          <Option
            setOpen={setOpen}
            Icon={DropdownIthem.icon4}
            text={DropdownIthem.text4}
            link={DropdownIthem.link4}
          />
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default LoginDropDown;
