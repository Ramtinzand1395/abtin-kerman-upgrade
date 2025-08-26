import React, { ReactNode } from "react";
interface BtnIconProps {
  ButtonText: string;
  ButtonColor: string;
  onClick: () => void;
  ButtonIcon: ReactNode;
}
const BtnIcon: React.FC<BtnIconProps> = ({
  ButtonText,
  ButtonColor,
  onClick,
  ButtonIcon,
}) => {
  return (
    <button
      onClick={() => onClick()}
      className="inline-flex overflow-hidden text-white bg-primary rounded group"
    >
      <span
        className={`px-3.5 py-2 text-white  flex items-center justify-center ${ButtonColor}`}
      >
        {ButtonIcon}
      </span>
      <span className="pl-4 pr-5 py-2.5">{ButtonText}</span>
    </button>
  );
};

export default BtnIcon;
