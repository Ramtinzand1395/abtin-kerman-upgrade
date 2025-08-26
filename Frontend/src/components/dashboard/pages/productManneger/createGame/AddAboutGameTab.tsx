import React from "react";
import { GameData } from "../../../../../types";
import AccountGameAdditionalExplanations from "../../../CkEditor/AccountGameAdditionalExplanations";
interface AddAboutGameTabProps {
  GameData: GameData;
  setGameData: React.Dispatch<React.SetStateAction<GameData>>;
}
const AddAboutGameTab: React.FC<AddAboutGameTabProps> = ({
  GameData,
  setGameData,
}) => {
  return (
    <div className="">
      <AccountGameAdditionalExplanations
        setGameData={setGameData}
        GameData={GameData}
      />
    </div>
  );
};

export default AddAboutGameTab;
