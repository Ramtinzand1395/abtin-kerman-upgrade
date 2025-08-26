import React from "react";
import ProductAdditionalExplanations from "../../../CkEditor/ProductAdditionalExplanations";
import { Product } from "../../../../../types";
interface AddAboutProductTabProps {
  Product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}
const AddAboutProductTab: React.FC<AddAboutProductTabProps> = ({
  Product,
  setProduct,
}) => {
  return (
    <div className="">
      <ProductAdditionalExplanations
        SelectedProduct={Product}
        setSelectedProduct={setProduct}
      />
    </div>
  );
};

export default AddAboutProductTab;
