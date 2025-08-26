import React, { useState } from "react";
import BtnTow from "../../../../utils/BtnTow";
import { toast } from "react-toastify";
import { addGameService } from "../../../../../services/ApiServices";
import { GameData } from "../../../../../types";
import AddGameImageTab from "./AddGameImageTab";
import AddGameTitleTab from "./AddGameTitleTab";
import AddGameCatsandTags from "./AddGameCatsandTags";
import AddGameSepicifications from "./AddGameSepicifications";
import AddAboutGameTab from "./AddAboutGameTab";

type TabKey =
  | "GameImage"
  | "GameInfo"
  | "GameSepicifications"
  | "AboutGame"
  | "GameCatsandTags";

const GeneralGameTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("GameImage");

  const renderContent = () => tabContent[activeTab] || tabContent.GameImage;

  const tabs: { key: TabKey; label: string }[] = [
    { key: "GameImage", label: "عکس بازی" },
    { key: "GameInfo", label: "اطلاعات اصلی بازی" },
    { key: "GameCatsandTags", label: "دسته بندی و تگ های بازی" },
    { key: "GameSepicifications", label: "اطلاعات فنی بازی" },
    { key: "AboutGame", label: "درباره بازی" },
  ];

  const [OpenAddImageModall, setOpenAddImageModall] = useState(false);

  const [GameData, setGameData] = useState<GameData>({
    info: [],
    title: "",
    primaryImage: null,
    additionalImages: [],
    company: "",
    region: "",
    multiplayer: false,
    categories: [],
    tags: [],
    features: [],
    additionalExplanations: "",
    averageRating: 0,
  });

  const tabContent = {
    GameImage: (
      <AddGameImageTab
        OpenAddImageModall={OpenAddImageModall}
        setOpenAddImageModall={setOpenAddImageModall}
        GameData={GameData}
        setGameData={setGameData}
      />
    ),
    GameInfo: <AddGameTitleTab GameData={GameData} setGameData={setGameData} />,
    GameCatsandTags: (
      <AddGameCatsandTags GameData={GameData} setGameData={setGameData} />
    ),
    GameSepicifications: (
      <AddGameSepicifications GameData={GameData} setGameData={setGameData} />
    ),
    AboutGame: (
      <AddAboutGameTab GameData={GameData} setGameData={setGameData} />
    ),
  };

  const handleAddGame = async () => {
    try {
      const { data } = await addGameService(GameData);
      toast.success(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" w-full md:container md:mx-auto mx-2 my-10">
      <h2 className="font-bold">ساخت بازی اکانتی</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <ul className="flex flex-wrap w-full text-sm font-medium text-center border-b-2 border-gray-700 text-gray-400">
          {tabs.map(({ key, label }) => (
            <li key={key} className="me-2">
              <button
                type="button"
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === key
                    ? "bg-gray-800 text-blue-500"
                    : "hover:bg-gray-800 hover:text-gray-300"
                }`}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4">{renderContent()}</div>

        <BtnTow
          ButtonColor="bg-green-500 hover:from-green-500 hover:to-green-400 hover:ring-green-400 mt-10"
          ButtonText={"ساخت بازی جدید"}
          onClick={handleAddGame}
        />
      </form>
    </div>
  );
};

export default GeneralGameTab;
