import React, {  useState } from "react";
import { GameData } from "../../../../../types";
interface EditeGameInfoProps {
  GameData: GameData;
  setGameData: React.Dispatch<React.SetStateAction<GameData>>;

}
const EditeGameInfo: React.FC<EditeGameInfoProps> = ({
  GameData,
  setGameData,
}) => {
  const [newKeySpecifications, setnewKeySpecifications] = useState("");
  const [newValueSpecifications, setnewValueSpecifications] = useState("");
  const handleAddSpecifications = () => {
    if (newKeySpecifications && newValueSpecifications) {
      setnewKeySpecifications("");
      setnewValueSpecifications("");
      setGameData((prev) => ({
        ...prev,
        features: [
          ...prev.features,
          { key: newKeySpecifications, value: newValueSpecifications },
        ],
      }));
    }
  };
  const handleRemoveFeature = (indexToRemove: number) => {
    setGameData((prevData) => ({
      ...prevData,
      features: prevData.features.filter((_, index) => index !== indexToRemove),
    }));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="">
        <label>اسم بازی</label>
        <input
          title="productName"
          className="block p-2 w-full z-20 text-sm text-gray-900  rounded-2xl border-2 border-secondery focus:ring-blue-500 focus:border-blue-500"
          type="text"
          value={GameData?.title}
          onChange={(e) =>
            setGameData({
              ...GameData,
              title: e.target.value,
            })
          }
          name="title"
        />
      </div>
      <div className="md:col-span-2">
        <label>اطلاعات فنی</label>
        <div className="flex items-center ">
          <div className="flex flex-col">
            <label>کلید</label>

            <input
              type="text"
              placeholder="Key"
              value={newKeySpecifications}
              onChange={(e) => setnewKeySpecifications(e.target.value)}
              className="px-5 py-1 rounded-lg border-primary border-2"
            />
          </div>
          <div className="flex flex-col">
            <label>مقدار</label>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Value"
                value={newValueSpecifications}
                onChange={(e) => setnewValueSpecifications(e.target.value)}
                className="px-5 py-1 rounded-lg border-primary border-2 mr-5"
              />
              <button
                onClick={() => handleAddSpecifications()}
                className="bg-green-500 hover:bg-green-600 px-3.5 py-2 rounded-md text-white "
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <ul>
          {GameData.features?.map((feature, index) => (
            <li key={index}>
              <strong>{feature.key}</strong>: {feature.value}
              <button onClick={() => handleRemoveFeature(index)}>
                <span className="bg-red-500 hover:bg-red-600 px-3.5 py-2 rounded-md text-white ">
                  -
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EditeGameInfo;
