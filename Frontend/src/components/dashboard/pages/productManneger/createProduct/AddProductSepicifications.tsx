import React, { useState } from "react";
import { Product } from "../../../../../types";
import BtnTow from "../../../../utils/BtnTow";
interface AddProductSepicificationsProps {
  Product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}
const AddProductSepicifications: React.FC<AddProductSepicificationsProps> = ({
  Product,
  setProduct,
}) => {
  // *features
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleAddFeature = () => {
    if (newKey && newValue) {
      setNewKey("");
      setNewValue("");
      setProduct((prev) => ({
        ...prev,
        features: [...prev.features, { key: newKey, value: newValue }],
      }));
    }
  };
  const [newKeySpecifications, setnewKeySpecifications] = useState("");
  const [newValueSpecifications, setnewValueSpecifications] = useState("");

  const handleAddSpecifications = () => {
    if (newKeySpecifications && newValueSpecifications) {
      setnewKeySpecifications("");
      setnewValueSpecifications("");
      setProduct((prev) => ({
        ...prev,
        Specifications: [
          ...prev.Specifications,
          { key: newKeySpecifications, value: newValueSpecifications },
        ],
      }));
    }
  };
  // * REMOVE
  const handleRemovefeuture = (indexToRemove: number) => {
    setProduct((prevData) => ({
      ...prevData,
      features: prevData?.features?.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };
  const handleRemoveSpecification = (indexToRemove: number) => {
    setProduct((prevData) => ({
      ...prevData,
      Specifications: prevData?.Specifications?.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="border-2 rounded-md p-4">
        <label>مشخصات اصلی</label>
        <div className="flex items-center ">
          <div className="flex flex-col">
            <label>کلید</label>
            <input
              type="text"
              placeholder="Key"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="px-5 py-1 rounded-lg border-primary border-2 ml-5"
            />
          </div>
          <div className="flex flex-col">
            <label>مقدار</label>
            <input
              type="text"
              placeholder="Value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="px-5 py-1 rounded-lg border-primary border-2 ml-5"
            />
          </div>
          <button
            onClick={() => handleAddFeature()}
            className="bg-green-500 hover:bg-green-600 px-3.5 py-2 rounded-md text-white"
            type="button"
            title="add"
          >
             <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18M12 6V18"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
          </button>
        </div>
        <div className="">
          <table className="min-w-full  text-sm font-light text-surface my-10">
            <thead className="border-b border-neutral-200 font-medium ">
              <tr>
                <th scope="col" className="px-6 py-4 text-start">
                  کلید ها
                </th>
                <th scope="col" className="px-6 py-4 text-start">
                  مقدار ها
                </th>
              </tr>
            </thead>
            <tbody>
              {Product.features &&
                Product.features.map((feature, index) => (
                  <tr
                    key={index}
                    className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 text-start "
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      <strong>{feature.key}</strong>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {feature.value}
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
                        onClick={() => handleRemovefeuture(index)}
                      />
                      
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="border-2 rounded-md p-4">
        <label>اطلاعات فنی</label>
        <div className="flex items-center ">
          <div className="flex flex-col">
            <label>کلید</label>

            <input
              type="text"
              placeholder="Key"
              value={newKeySpecifications}
              onChange={(e) => setnewKeySpecifications(e.target.value)}
              className="px-5 py-1 rounded-lg border-primary border-2 ml-5"
            />
          </div>
          <div className="flex flex-col">
            <label>مقدار</label>

            <input
              type="text"
              placeholder="Value"
              value={newValueSpecifications}
              onChange={(e) => setnewValueSpecifications(e.target.value)}
              className="px-5 py-1 rounded-lg border-primary border-2 ml-5"
            />
          </div>

          <button
            onClick={() => handleAddSpecifications()}
            className="bg-green-500 hover:bg-green-600 px-3.5 py-2 rounded-md text-white"
            type="button"
            title="add"
          >
             <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18M12 6V18"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
          </button>
        </div>
        <div className="">
          <table className="min-w-full  text-sm font-light text-surface my-10">
            <thead className="border-b border-neutral-200 font-medium ">
              <tr>
                <th scope="col" className="px-6 py-4 text-start">
                  کلید ها
                </th>
                <th scope="col" className="px-6 py-4 text-start">
                  مقدار ها
                </th>
              </tr>
            </thead>
            <tbody>
              {Product.Specifications &&
                Product.Specifications.map((Specification, index) => (
                  <tr
                    key={index}
                    className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 text-start "
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      <strong>{Specification.key}</strong>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {Specification.value}
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
                        onClick={() => handleRemoveSpecification(index)}
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

export default AddProductSepicifications;
