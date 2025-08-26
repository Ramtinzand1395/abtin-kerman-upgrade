import React from "react";
import { Product } from "../../../../../types";
interface AddTitleTabProps {
  Product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}
const AddTitleTab: React.FC<AddTitleTabProps> = ({ Product, setProduct }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="flex flex-col">
        <label className="mb-3">عنوان محصول</label>
        <input
          type="text"
          name="title"
          value={Product.title}
          onChange={handleChange}
          required
          className="px-5 py-2 rounded-lg border-primary border-2 ml-5"
          title="title"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-3">قیمت</label>
        <input
          type="number"
          name="price"
          value={Product.price}
          onChange={handleChange}
          required
          className="px-5 py-2 rounded-lg border-primary border-2 ml-5"
          title="price"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-3">تعداد</label>
        <input
          type="number"
          name="quantity"
          value={Product.quantity}
          onChange={handleChange}
          required
          className="px-5 py-2 rounded-lg border-primary border-2 ml-5"
          title="qty"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-3">توضیحات</label>
        <textarea
          name="description"
          value={Product.description}
          onChange={handleChange}
          className="px-5 py-2 rounded-lg border-primary border-2 ml-5"
          title="description"
        />
      </div>
    </div>
  );
};

export default AddTitleTab;
