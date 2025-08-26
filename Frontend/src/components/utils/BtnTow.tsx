import React from "react";

interface BtnTowProps {
  ButtonText: string | React.ReactNode;
  ButtonColor: string;
  onClick: () => void;
}

const BtnTow: React.FC<BtnTowProps> = ({
  ButtonText,
  ButtonColor,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick()}
      className={`relative rounded px-5 py-2.5 overflow-hidden group ${ButtonColor} hover:bg-gradient-to-r text-white hover:ring-2 hover:ring-offset-2  transition-all ease-out duration-300`}
    >
      {" "}
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span className="relative">{ButtonText}</span>
    </button>
  );
};

export default BtnTow;
