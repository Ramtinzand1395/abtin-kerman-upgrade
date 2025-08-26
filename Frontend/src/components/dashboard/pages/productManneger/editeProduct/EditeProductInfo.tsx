import React, {  useState } from "react";
import {  Product } from "../../../../../types";
interface EditeProductInfoProps {
  SelectedProduct: Product;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product>>;
}
const EditeProductInfo: React.FC<EditeProductInfoProps> = ({
  SelectedProduct,
  setSelectedProduct,
}) => {
  const [newKeySpecifications, setnewKeySpecifications] = useState("");
  const [newValueSpecifications, setnewValueSpecifications] = useState("");
  const handleAddfeatures = () => {
    if (newKeySpecifications && newValueSpecifications) {
      setnewKeySpecifications("");
      setnewValueSpecifications("");
      setSelectedProduct((prev) => ({
        ...prev,
        features: [
          ...prev.features,
          { key: newKeySpecifications, value: newValueSpecifications },
        ],
      }));
    }
  };
  const handleRemoveFeature = (indexToRemove: number) => {
    setSelectedProduct((prevData) => ({
      ...prevData,
      features: prevData.features.filter((_, index) => index !== indexToRemove),
    }));
  };
  const [newSpecifations, setnewSpecifations] = useState("");
  const [newValuesSpecifactions, setnewValuesSpecifactions] = useState("");
  const handleAddSpecifications = () => {
    if (newSpecifations && newValuesSpecifactions) {
      setnewSpecifations("");
      setnewValuesSpecifactions("");
      setSelectedProduct((prev) => ({
        ...prev,
        Specifications: [
          ...prev.Specifications,
          { key: newSpecifations, value: newValuesSpecifactions },
        ],
      }));
    }
  };
  const handleRemoveSpecifications = (indexToRemove: number) => {
    setSelectedProduct((prevData) => ({
      ...prevData,
      Specifications: prevData.Specifications.filter(
        (_, index) => index !== indexToRemove
      ),
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
          value={SelectedProduct?.title}
          onChange={(e) =>
            setSelectedProduct({
              ...SelectedProduct,
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
                onClick={() => handleAddfeatures()}
                className="bg-green-500 hover:bg-green-600 px-3.5 py-2 rounded-md text-white "
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <ul>
          {SelectedProduct.features?.map((feature, index) => (
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
      <div className="md:col-span-2">
        <label> ویژگی ها</label>
        <div className="flex items-center ">
          <div className="flex flex-col">
            <label>کلید</label>

            <input
              type="text"
              placeholder="Key"
              value={newSpecifations}
              onChange={(e) => setnewSpecifations(e.target.value)}
              className="px-5 py-1 rounded-lg border-primary border-2"
            />
          </div>
          <div className="flex flex-col">
            <label>مقدار</label>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Value"
                value={newValuesSpecifactions}
                onChange={(e) => setnewValuesSpecifactions(e.target.value)}
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
          {SelectedProduct.Specifications?.map((feature, index) => (
            <li key={index}>
              <strong>{feature.key}</strong>: {feature.value}
              <button onClick={() => handleRemoveSpecifications(index)}>
                <span className="bg-red-500 hover:bg-red-600 px-3.5 py-2 rounded-md text-white ">
                  -
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <label>قیمت</label>
        <input
          title="productPrice"
          className="block p-2 w-full z-20 text-sm text-gray-900  rounded-2xl border-2 border-secondery focus:ring-blue-500 focus:border-blue-500"
          type="text"
          value={SelectedProduct?.price}
          onChange={(e) =>
            setSelectedProduct({
              ...SelectedProduct,
              price: Number(e.target.value),
            })
          }
          name="price"
        />
        <label>تعداد</label>
        <input
          title="productquantity"
          className="block p-2 w-full z-20 text-sm text-gray-900  rounded-2xl border-2 border-secondery focus:ring-blue-500 focus:border-blue-500"
          type="text"
          value={SelectedProduct?.quantity}
          onChange={(e) =>
            setSelectedProduct({
              ...SelectedProduct,
              quantity: Number(e.target.value),
            })
          }
          name="quantity"
        />
      </div>
      <div className="flex flex-col">
        <label>Description</label>
        <textarea
          name="description"
          value={SelectedProduct.description}
          onChange={(e) =>
            setSelectedProduct({
              ...SelectedProduct,
              description: e.target.value,
            })
          }
          className="px-5 py-1 rounded-lg border-primary border-2 ml-5"
          title="description"
        />
      </div>
    </div>
  );
};

export default EditeProductInfo;
