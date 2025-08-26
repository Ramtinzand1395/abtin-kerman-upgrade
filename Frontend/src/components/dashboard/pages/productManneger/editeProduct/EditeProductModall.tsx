import React, { useEffect, useState } from "react";
import { Product } from "../../../../../types";
import EditeImageTab from "./EditeImageTab";
import BtnTow from "../../../../utils/BtnTow";
import { toast } from "react-toastify";
import { updateProductService } from "../../../../../services/ApiServices";
import EditeProductInfo from "./EditeProductInfo";
import ProductAdditionalExplanations from "../../../CkEditor/ProductAdditionalExplanations";
import EditProductTag from "./EditProductTag";
interface EditeProductModallProps {
  SelectedProduct: Product;
  setOpenModall: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product>>;
  setLodaingProducts: React.Dispatch<React.SetStateAction<boolean>>;
}
type TabKey =
  | "productImage"
  | "productInfo"
  | "aboutProduct"
  | "createProducts"
const EditeProductModall: React.FC<EditeProductModallProps> = ({
  SelectedProduct,
  setOpenModall,
  setSelectedProduct,
  setLodaingProducts,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>("productImage");
  const renderContent = () => tabContent[activeTab] || tabContent.productImage;

    const tabs: { key: TabKey; label: string }[] = [
    { key: "productImage", label: " عکس محصول " },
    { key: "productInfo", label: "  اطلاعات فنی محصول " },
    { key: "aboutProduct", label: " درباره محصول " },
    { key: "createProducts", label: " دسته بندی و تگ  " },
  ];
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  const handleUpdateProduct = async () => {
    setLodaingProducts(true);
    try {
      const { data } = await updateProductService(SelectedProduct);
      console.log(SelectedProduct, "SelectedProduct");
      toast.success(data.message);
    } catch (err) {
      console.log(err);
    } finally {
      setLodaingProducts(false);
    }
  };
  const closeModall = () => {
    setOpenModall(false);
  };

  // ? tabContent
  const tabContent = {
    productImage: (
      <EditeImageTab
        SelectedProduct={SelectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    ),
    productInfo: (
      <EditeProductInfo
        SelectedProduct={SelectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    ),
    aboutProduct: (
      <ProductAdditionalExplanations
        SelectedProduct={SelectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    ),
    createProducts: (
      <EditProductTag
        SelectedProduct={SelectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    ),
  };

  return (
    <div
      onClick={() => setOpenModall(false)}
      className="bg-gray-700 bg-opacity-60 z-10 w-full h-full fixed top-0 left-0 flex items-center justify-center"
    >
      <div
        className={`w-[90vw] h-[90vh] overflow-y-auto rounded-2xl bg-white px-10`}
        onClick={handleModalClick}
      >
        <div className="flex items-center justify-between sticky bg-white top-0">
          <p className="flex items-center"> ویرایش {SelectedProduct.title}</p>
             <svg
            className="cursor-pointer m-4 "
            onClick={() => setOpenModall(false)}
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z"
              fill="#292D32"
            />
          </svg>
        </div>
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

        {/* Render content based on active tab */}
        <div className="mt-4">{renderContent()}</div>
        <div className="sticky bottom-0 bg-white p-2 border-t-2 border-black flex items-center justify-between mt-5">
          <BtnTow
            ButtonColor="bg-blue-500 hover:from-blue-500 hover:to-blue-400 hover:ring-blue-400"
            ButtonText={"تغییر"}
            onClick={handleUpdateProduct}
          />
          <BtnTow
            ButtonColor="bg-red-500 hover:from-red-500 hover:to-red-400 hover:ring-red-400"
            ButtonText={"انصراف"}
            onClick={closeModall}
          />
        </div>
      </div>
    </div>
  );
};

export default EditeProductModall;
