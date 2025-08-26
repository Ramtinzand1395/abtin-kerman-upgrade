import React, { useState } from "react";
// *
interface EditeImageTabProps {
  SelectedProduct: Product;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product>>;
}
import {  Product } from "../../../../../types";
// *
import AddImageModall from "../../../AddImageModall";
import BtnTow from "../../../../utils/BtnTow";
// *
const EditeImageTab: React.FC<EditeImageTabProps> = ({
  SelectedProduct,
  setSelectedProduct,
}) => {
  const handleRemoveInfo = (indexToRemove: number) => {
    setSelectedProduct((prevData) => ({
      ...prevData,
      additionalImages: prevData?.additionalImages?.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };
  const [OpenAddImageModall, setOpenAddImageModall] = useState(false);
  return (
    <div className="">
      <img
        // src={`http://localhost:5000/${SelectedProduct.primaryImage?.direction} `}
        //! change
        src={`${SelectedProduct.primaryImage?.direction}`}
        alt=""
        className="w-[30vh] h-[30vh]"
      />
      <div className="grid grid-cols-6 gap-5 mt-5">
        {OpenAddImageModall && (
          <AddImageModall
            setOpenAddImageModall={setOpenAddImageModall}
            setSelectedProduct={setSelectedProduct}
            SelectedProduct={SelectedProduct}
          />
        )}

        {SelectedProduct?.additionalImages?.map((img, index) => (
          <img
            onClick={() => handleRemoveInfo(index)}
            key={img._id}
            // src={`http://localhost:5000/${img.direction} `}
            //! change
        src={`${img.direction}`}
            alt=""
            className="w-full h-[20vh]"
          />
        ))}
      </div>
      <BtnTow
        ButtonColor="bg-blue-500 hover:from-blue-500 hover:to-blue-400 hover:ring-blue-400 mt-5"
        ButtonText={"انتخاب عکس"}
        onClick={() => setOpenAddImageModall(true)}
      />
    </div>
  );
};

export default EditeImageTab;
