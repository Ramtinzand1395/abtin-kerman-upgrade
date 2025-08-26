import React, { useState } from "react";
import BtnTow from "../../../../utils/BtnTow";
import { toast } from "react-toastify";
import { addProductService } from "../../../../../services/ApiServices";
import AddImageTab from "./AddImageTab";
import AddTitleTab from "./AddTitleTab";
import AddCatsandTags from "./AddCatsandTags";
import AddProductSepicifications from "./AddProductSepicifications";
import AddAboutProductTab from "./AddAboutProductTab";
import { Product } from "../../../../../types";
import AddMenu from "./AddMenu";

type TabKey =
  | "ProductImage"
  | "ProductInfo"
  | "ProductSepicifications"
  | "AboutProduct"
  | "AddMenu"
  | "ProductCatsandTags";

const GeneralProductTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("ProductImage");

  const renderContent = () => tabContent[activeTab] || tabContent.ProductImage;

  const tabs: { key: TabKey; label: string }[] = [
    { key: "ProductImage", label: "عکس محصول" },
    { key: "ProductInfo", label: "اطلاعات اصلی محصول" },
    { key: "ProductCatsandTags", label: "دسته بندی و تگ های محصول" },
    { key: "ProductSepicifications", label: "اطلاعات فنی محصول" },
    { key: "AboutProduct", label: "درباره محصول" },
    { key: "AddMenu", label: " منو" },

  ];

  const [OpenAddImageModall, setOpenAddImageModall] = useState(false);

  const [Product, setProduct] = useState<Product>({
    title: "",
    price: 0,
    features: [],
    Specifications: [],
    description: "",
    primaryImage: null,
    additionalImages: [],
    tags: [],
    categories: [],
    sellOne: false,
    quantity: 1,
    additionalExplanations: "",
    averageRating:0,
  });

  const tabContent = {
    ProductImage: (
      <AddImageTab
        OpenAddImageModall={OpenAddImageModall}
        setOpenAddImageModall={setOpenAddImageModall}
        Product={Product}
        setProduct={setProduct}
      />
    ),
    ProductInfo: <AddTitleTab Product={Product} setProduct={setProduct} />,
    ProductCatsandTags: (
      <AddCatsandTags Product={Product} setProduct={setProduct} />
    ),
    ProductSepicifications: (
      <AddProductSepicifications Product={Product} setProduct={setProduct} />
    ),
    AboutProduct: (
      <AddAboutProductTab Product={Product} setProduct={setProduct} />
    ),
    AddMenu:(
      <AddMenu  setProduct={setProduct} />

    )
  };
  console.log(Product)

  const handleCreateProduct = async () => {
    try {
      const { data } = await addProductService(Product);
      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Error creating product. Please try again.");
    }
  };

  return (
    <div className=" w-full md:container md:mx-auto mx-2 my-10">
      <h1>ساخت محصول</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <ul className="flex flex-wrap w-full text-sm font-medium text-center border-b-2 border-gray-700 text-gray-400">
          {tabs.map(({ key, label }) => (
            <li key={key} className="me-2">
              <button
                type="button"
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === key
                    ? "bg-gray-800 text-blue-500"
                    : "hover:bg-gray-800 hover:text-gray-300"
                }`}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4">{renderContent()}</div>

        <BtnTow
          ButtonColor="bg-green-500 hover:from-green-500 hover:to-green-400 hover:ring-green-400 mt-10"
          ButtonText={"ساخت محصول جدید"}
          onClick={handleCreateProduct}
        />
      </form>
    </div>
  );
};

export default GeneralProductTab;
