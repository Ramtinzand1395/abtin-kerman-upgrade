import React, { useState } from "react";
import { Product, Tag } from "../../../types";
interface SearchTagsProps {
  Product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  Tags: Tag[];
}
const SearchTagsProducts: React.FC<SearchTagsProps> = ({
  setProduct,
  Tags,
  Product,
}) => {
  const [SearchTherm, setSearchTherm] = useState("");

  const handleAddTag = (tag: Tag) => {
    setProduct((prevData) => ({
      ...prevData,
      tags: [...(prevData.tags ?? []), tag],
    }));
    setSearchTherm("");
  };
  const filteredTags = Tags?.filter(
    (tag: Tag) =>
      tag.tagName.toLowerCase().includes(SearchTherm.toLowerCase()) &&
      !Product?.tags?.some((selectedTag) => selectedTag.tagName === tag.tagName)
  ).slice(0, 3);
  return (
    <div className="">
      <input
        type="text"
        name="categories"
        value={SearchTherm}
        onChange={(e) => setSearchTherm(e.target.value)}
        placeholder="جستجو تگ ها"
        className="border-2 border-black rounded-lg p-2 mx-2"
      />
      {SearchTherm && (
        <div className=" bg-white mt-2 w-auto p-2 rounded-md border-2">
          {filteredTags?.length > 0 ? (
            filteredTags?.map((tag: Tag, index: number) => (
              <p
                key={index}
                className={`cursor-pointer p-2 rounded-md ${
                  index % 2 !== 0 && "bg-gray-200"
                } `}
                onClick={() => handleAddTag(tag)}
              >
                {tag.tagName}
              </p>
            ))
          ) : (
            <p className="text-red-500 font-tanha">
              تگی با این اسم پیدا نشد یا قبلا اتخاب شده
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchTagsProducts;
