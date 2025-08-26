import React, { useState } from "react";
import { Category, Product } from "../../../types";
interface SearchCatsProps {
  Product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  cats: Category[];
}
const SearchCatsProducts: React.FC<SearchCatsProps> = ({
  setProduct,
  cats,
  Product,
}) => {
  const [SearchTherm, setSearchTherm] = useState("");

  const handleAddCat = (cat: Category) => {
    setProduct((prevData) => ({
      ...prevData,
      categories: [...(prevData.categories ?? []), cat],
    }));
    setSearchTherm("");
  };
  const filteredCategories = cats
    ?.filter(
      (cat) =>
        cat.categoryName.toLowerCase().includes(SearchTherm.toLowerCase()) &&
        !Product?.categories?.some(
          (selectedCat) => selectedCat.categoryName === cat.categoryName
        )
    )
    .slice(0, 3);
  return (
    <div className="">
      <input
        type="text"
        name="categories"
        value={SearchTherm}
        onChange={(e) => setSearchTherm(e.target.value)}
        placeholder="جستجو دسته بندی ها"
        className="border-2 border-black rounded-lg p-2 mx-2"
      />
      {SearchTherm && (
        <div className=" bg-white mt-2 w-auto p-2 rounded-md border-2">
          {filteredCategories?.length > 0 ? (
            filteredCategories?.map((cat, index) => (
              <p
                key={index}
                className={`cursor-pointer p-2 rounded-md ${
                  index % 2 !== 0 && "bg-gray-200"
                } `}
                onClick={() => handleAddCat(cat)}
              >
                {cat.categoryName}
              </p>
            ))
          ) : (
            <p className="text-red-500 font-tanha">
              دسته بندی با این اسم پیدا نشد یا قبلا اتخاب شده
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchCatsProducts;
