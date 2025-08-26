import { Product } from "../../../types";

interface ProductInformationTabProps<T> {
  Product: T;
}

const ProductInformationTab = <T,>({
  Product,
}: ProductInformationTabProps<T>) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: (Product as Product).additionalExplanations || "",
      }}
      className="p-5 rounded-xl bg-white"
    ></div>
  );
};

export default ProductInformationTab;
