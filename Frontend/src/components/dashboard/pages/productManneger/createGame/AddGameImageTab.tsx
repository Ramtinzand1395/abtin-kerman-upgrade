import React from "react";
import { GameData, ImageType } from "../../../../../types";
import AddImageModall from "../../../AddImageModall";
interface AddGameImageTabProps {
  OpenAddImageModall: boolean;
  setOpenAddImageModall: React.Dispatch<React.SetStateAction<boolean>>;
  GameData: GameData;
  setGameData: React.Dispatch<React.SetStateAction<GameData>>;
}
const AddGameImageTab: React.FC<AddGameImageTabProps> = ({
  OpenAddImageModall,
  setOpenAddImageModall,
  GameData,
  setGameData,
}) => {
  const removePrimaryImage = () => {
    setGameData((prev) => ({
      ...prev,
      primaryImage: null,
    }));
  };
  const removeAdditionalImage = (image: ImageType) => {
    setGameData((prev) => {
      const updatedImages = prev.additionalImages.filter(
        (img) => img._id !== image._id
      );
      return { ...prev, additionalImages: updatedImages };
    });
  };
  return (
    <div className="my-5">
      <div className="">
        <label className="font-bold text-2xl flex items-center my-5">
          انتخاب عکس
          <span
            onClick={() => setOpenAddImageModall(!OpenAddImageModall)}
            className="border-2 p-2 mx-2 hover:bg-green-500 hover:text-white cursor-pointer transition-all duration-150 ease-in-out delay-150 rounded-xl"
          >
               <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18M12 6V18"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
          </span>
        </label>
      </div>
      <div className="flex items-center">
        <div className="">
          <label className="font-bold">عکس اصلی</label>
          {GameData.primaryImage?._id ? (
            <div className="">
              <img
                onClick={() => removePrimaryImage()}
                className="rounded-lg"
                // src={`http://localhost:5000/${GameData.primaryImage.direction}`}
                //! change
                src={`${GameData.primaryImage.direction}`}
                alt=""
              />
            </div>
          ) : (
            <div>
              <p>هنوز عکس اصلی انتخاب نشده</p>
            </div>
          )}
        </div>
        <div className="mr-5">
          <label className="font-bold">عکس های فرعی</label>
          {GameData.additionalImages.length > 0 ? (
            <div className="">
              <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-5 ">
                {GameData.additionalImages.map((img, index) => (
                  <div className="">
                    <img
                      key={index}
                      onClick={() => removeAdditionalImage(img)}
                      className="rounded-lg"
                      // src={`http://localhost:5000/${img.direction}`}
                      //! change
                      src={`${img?.direction}`}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p>هنوز عکس فرعی انتخاب نشده</p>
            </div>
          )}
        </div>
      </div>
      {OpenAddImageModall && (
        <AddImageModall<GameData>
          setSelectedProduct={setGameData}
          SelectedProduct={GameData}
          setOpenAddImageModall={setOpenAddImageModall}
        />
      )}
    </div>
  );
};

export default AddGameImageTab;
