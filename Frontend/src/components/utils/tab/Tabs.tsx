import React, { useState } from "react";
import { motion } from "framer-motion";
import CommentsTab from "./CommentsTab";
import ProductInformationTab from "./ProductInformationTab";
import ProductSpecifications from "./ProductSpecifications";
import { Product, GameData } from "../../../types"; // Import your types

interface ChipProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
}

interface TabsProps {
  Product: Product | GameData; // Explicitly use the union type here
}

const Chip: React.FC<ChipProps> = ({ text, selected, setSelected }) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`text-white${selected ? "" : " hover:text-slate-200 hover:bg-slate-700"} text-sm transition-colors px-2.5 py-2 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

const tabs = ["توضیحات", "مشخصات فنی", "نظرات"];

const Tabs: React.FC<TabsProps> = ({ Product }) => {
  const [selected, setSelected] = useState(tabs[0]);

  return (
    <div className="rounded-t-lg p-5">
      <div className="px-4 my-5 flex items-center flex-wrap gap-2 bg-secondery py-3 rounded-lg">
        {tabs.map((tab) => (
          <Chip
            text={tab}
            selected={selected === tab}
            setSelected={setSelected}
            key={tab}
          />
        ))}
      </div>
      {selected === "توضیحات" ? (
        <div>
          <ProductInformationTab Product={Product} />
        </div>
      ) : selected === "مشخصات فنی" ? (
        <div>
          <ProductSpecifications Product={Product} />
        </div>
      ) : (
        <div>
          <CommentsTab Product={Product} />
        </div>
      )}
    </div>
  );
};

export default Tabs;
