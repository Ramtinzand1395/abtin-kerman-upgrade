import React, { useState } from "react";
import { Tag } from "../../../types";

interface HasTags {
  tags?: Tag[];
}

interface SearchTagsProps<T extends HasTags> {
  GameData: T;
  setGameData: React.Dispatch<React.SetStateAction<T>>;
  Tags: Tag[];
}

const SearchTags = <T extends HasTags>({
  setGameData,
  Tags,
  GameData,
}: SearchTagsProps<T>) => {
  const [SearchTherm, setSearchTherm] = useState("");

  const handleAddTag = (tag: Tag) => {
    setGameData((prevData) => ({
      ...prevData,
      tags: [...(prevData.tags ?? []), tag], // Default to an empty array if `tags` is undefined
    }));
    setSearchTherm("");
  };
  const filteredTags = Tags.filter(
    (tag) =>
      tag.tagName.toLowerCase().includes(SearchTherm.toLowerCase()) &&
      !(GameData.tags ?? []).some(
        (selectedTag) => selectedTag.tagName === tag.tagName
      )
  ).slice(0, 3);

  return (
    <div>
      <input
        type="text"
        name="categories"
        value={SearchTherm}
        onChange={(e) => setSearchTherm(e.target.value)}
        placeholder="جستجو تگ ها"
        className="border-2 border-black rounded-lg p-2 mx-2"
      />
      {SearchTherm && (
        <div className="bg-white mt-2 w-auto p-2 rounded-md border-2">
          {filteredTags.length > 0 ? (
            filteredTags.map((tag, index) => (
              <p
                key={tag._id}
                className={`cursor-pointer p-2 rounded-md ${
                  index % 2 !== 0 && "bg-gray-200"
                }`}
                onClick={() => handleAddTag(tag)}
              >
                {tag.tagName}
              </p>
            ))
          ) : (
            <p className="text-red-500 font-tanha">
              تگی با این اسم پیدا نشد یا قبلا انتخاب شده
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchTags;
