import React, { useEffect, useState } from "react";
import SearchTagsProducts from "../../../searchTag/SearchTagsProducts";
import SearchCatsProducts from "../../../searchTag/SearchCatsProducts";
import {
  getCategoriesService,
  getTagService,
} from "../../../../../services/ApiServices";
import { Product } from "../../../../../types";
import BtnTow from "../../../../utils/BtnTow";
interface AddCatsandTagsProps {
  Product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}
const AddCatsandTags: React.FC<AddCatsandTagsProps> = ({
  Product,
  setProduct,
}) => {
  const handleRemovetag = (indexToRemove: number) => {
    setProduct((prevData) => ({
      ...prevData,
      tags: prevData?.tags?.filter((_, index) => index !== indexToRemove),
    }));
  };
  const handleRemovecats = (indexToRemove: number) => {
    setProduct((prevData) => ({
      ...prevData,
      categories: prevData?.categories?.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };
  // * TAGS & CATS
  const [Tags, setTags] = useState([]);
  const [categories, setcategories] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      try {
        const { data } = await getTagService();
        const { data: cats } = await getCategoriesService();
        setcategories(cats);
        setTags(data);
      } catch (err) {
        console.log(err);
      }
    };
    getdata();
  }, []);
  return (
    <div>
      {/* sdadsa */}
      <div className="grid grid-cols-2 gap-5">
        <div className="">
          <label className="mb-3">جستجو تگ ها</label>
          <SearchTagsProducts
            setProduct={setProduct}
            Tags={Tags}
            Product={Product}
          />
        </div>
        <div className="">
          <label className="mb-3"> جستجو دسته بندی ها</label>
          <SearchCatsProducts
            setProduct={setProduct}
            Product={Product}
            cats={categories}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="">
          <table className="min-w-full  text-sm font-light text-surface my-10">
            <thead className="border-b border-neutral-200 font-medium ">
              <tr>
                <th scope="col" className="px-6 py-4 text-start">
                  تگ ها
                </th>
              </tr>
            </thead>
            <tbody>
              {Product.tags &&
                Product.tags.map((tag, index) => (
                  <tr
                    key={tag._id}
                    className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 text-start "
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {tag.tagName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-end">
                      <BtnTow
                        ButtonColor="bg-red-500 hover:from-red-500 hover:to-red-400 hover:ring-red-400 "
                        ButtonText={  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M20.5 6H3.49988" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M9.5 11L10 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M14.5 11L14 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>}
                        onClick={() => handleRemovetag(index)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="">
          <table className="min-w-full text-left text-sm font-light text-surface my-10">
            <thead className="border-b border-neutral-200 font-medium ">
              <tr>
                <th scope="col" className="px-6 py-4 text-start">
                  دسته بندی ها
                </th>
              </tr>
            </thead>
            <tbody>
              {Product.tags &&
                Product.categories?.map((cat, index) => (
                  <tr
                    key={cat._id}
                    className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 text-start "
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {cat.categoryName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-end">
                      <BtnTow
                        ButtonColor="bg-red-500 hover:from-red-500 hover:to-red-400 hover:ring-red-400 "
                        ButtonText={  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M20.5 6H3.49988" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M9.5 11L10 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M14.5 11L14 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>}
                        onClick={() => handleRemovecats(index)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddCatsandTags;
