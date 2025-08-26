import React from "react";
import { Product } from "../../../../../types";
interface AddMenuProps {
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}
const AddMenu: React.FC<AddMenuProps> = ({ setProduct }) => {
  const handleMenuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct((prevData) => ({
      ...prevData,
      menuLink: e.target.value,
    }));
  };
  const handleSlug1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct((prevData) => ({
      ...prevData,
      slug1: e.target.value,
    }));
  };
  const handleslug2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct((prevData) => ({
      ...prevData,
      slug2: e.target.value,
    }));
  };
  const slug1 = [
    { id: 1, title: "playstations" },
    { id: 2, title: "xboxs" },
    { id: 3, title: "old-consoles" },
    { id: 4, title: "used-consoles" },
    { id: 5, title: "accessories" },
  ];
  const slug2 = [
    { id: 1, title: "playstation-5" },
    { id: 2, title: "playstation-4" },
    { id: 3, title: "xbox-series" },
    { id: 4, title: "xbox-one" },
    { id: 5, title: "playstation-2" },
    { id: 6, title: "super-sega" },
    { id: 7, title: "playstation-3" },
    { id: 8, title: "playstation-4" },
    { id: 9, title: "ps5-controller" },

  ];
  return (
    <div>
      <select title="menuLink" onChange={handleMenuChange}>
      <option value={""}>انتخاب سر منو</option>
        <option value={"products"}>products</option>
        <option value={"games"}>games</option>
      </select>
      <select title="slug1" onChange={handleSlug1Change}>
      <option value={""}>انتخاب منو 1</option>
      {
        slug1.map((slug)=>(

            <option key={slug.id} value={slug.title}>{slug.title}</option>
        ))
      }
      </select>
      <select title="slug2" onChange={handleslug2Change}>
      <option value={""}>انتخاب منو 2</option>
      {
        slug2.map((slug)=>(

            <option key={slug.id} value={slug.title}>{slug.title}</option>
        ))
      }
      </select>
    </div>
  );
};

export default AddMenu;
