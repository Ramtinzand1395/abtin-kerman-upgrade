import React, { useState } from "react";
import GamesTable from "./GamesTable";
import ProductsTable from "./ProductsTable";
import GeneralProductTab from "./createProduct/GeneralProductTab";
import GeneralGameTab from "./createGame/GeneralGameTab";
type TabKey = "games" | "products" | "createProducts" | "createGames";
const tabContent = {
  games: <GamesTable />,
  products: <ProductsTable />,
  createProducts: <GeneralProductTab />,
  createGames: <GeneralGameTab />,
};

const ProductsManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("games");

  const renderContent = () => tabContent[activeTab] || tabContent.games;

  const tabs: { key: TabKey; label: string }[] = [
    { key: "games", label: "لیست بازی ها" },
    { key: "products", label: "لیست محصولات" },
    { key: "createProducts", label: " محصول جدید" },
    { key: "createGames", label: "  بازی جدید" },
  ];

  return (
    <div className="w-full md:container md:mx-auto mx-2 my-5">
      <ul className="flex flex-wrap w-full text-sm font-medium text-center border-b-2 border-gray-700 text-gray-400">
        {tabs.map(({ key, label }) => (
          <li key={key} className="me-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === key
                  ? " bg-gray-800 text-blue-500"
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
    </div>
  );
};

export default ProductsManager;
