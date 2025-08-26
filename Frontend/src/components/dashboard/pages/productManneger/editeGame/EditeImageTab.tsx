import React, { useState } from "react";
// *
interface EditeImageTabProps {
  GameData: GameData;
  setGameData: React.Dispatch<React.SetStateAction<GameData>>;
}
import { GameData } from "../../../../../types";
// *
import AddImageModall from "../../../AddImageModall";
import BtnTow from "../../../../utils/BtnTow";
// *
const EditeImageTab: React.FC<EditeImageTabProps> = ({
  GameData,
  setGameData,
}) => {
  const handleRemoveInfo = (indexToRemove: number) => {
    setGameData((prevData) => ({
      ...prevData,
      additionalImages: prevData.additionalImages.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };
  const [OpenAddImageModall, setOpenAddImageModall] = useState(false);
  return (
    <div className="">
      <img
        // src={`http://localhost:5000/${GameData.primaryImage?.direction} `}
          //! change
          src={`${GameData.primaryImage?.direction}`}
        alt=""
        className="w-[30vh] h-[30vh]"
      />
      <div className="grid grid-cols-6 gap-5 mt-5">
        {OpenAddImageModall && (
          <AddImageModall<GameData>
            setOpenAddImageModall={setOpenAddImageModall}
            setSelectedProduct={setGameData}
            SelectedProduct={GameData}
          />
        )}

        {GameData?.additionalImages.map((img, index) => (
          <img
            onClick={() => handleRemoveInfo(index)}
            key={img._id}
            // src={`http://localhost:5000/${img.direction} `}
              //! change
          src={`${img.direction}`}
            alt=""
            className="w-full h-[20vh]"
          />
        ))}
      </div>
      <BtnTow
        ButtonColor="bg-blue-500 hover:from-blue-500 hover:to-blue-400 hover:ring-blue-400 mt-5"
        ButtonText={"انتخاب عکس"}
        onClick={() => setOpenAddImageModall(true)}
      />
    </div>
  );
};

export default EditeImageTab;
