import React from "react";
import AddImageModallProduct from "../../../AddImageModallProduct";
import { Product } from "../../../../../types";
interface AddImageTabProps {
  OpenAddImageModall: boolean;
  setOpenAddImageModall: React.Dispatch<React.SetStateAction<boolean>>;
  Product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}
const AddImageTab: React.FC<AddImageTabProps> = ({
  OpenAddImageModall,
  setOpenAddImageModall,
  Product,
  setProduct,
}) => {
  return (
    <div className="">
      <div className="">
        <label className="font-bold text-2xl flex items-center mb-5">
          انتخاب عکس
          <span
            onClick={() => setOpenAddImageModall(!OpenAddImageModall)}
            className="border-2 p-2 mx-2 hover:bg-green-500 hover:text-white cursor-pointer transition-all duration-150 ease-in-out delay-150 rounded-xl"
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
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
          </span>
        </label>
      </div>

    
      <div className="flex items-center">
        <div className="">
          <label className="font-bold">عکس اصلی</label>
          {Product.primaryImage?._id ? (
            <div className="">
              <img
                className="w-[20vh] h-[20vh] rounded-lg"
                // src={`http://localhost:5000/${Product.primaryImage.direction}`}
                //! change
                src={`${Product?.primaryImage?.direction}`}
                alt=""
              />
            </div>
          ) : (
            <div>
              <p>هنوز عکس اصلی انتخاب نشده</p>
            </div>
          )}
        </div>
        <div className="mr-5">
          <label className="font-bold">عکس های فرعی</label>
          {Product.additionalImages && Product.additionalImages.length > 0 ? (
            <div className="">
              <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-5">
                {Product.additionalImages.map((img, index) => (
                  <div className="">
                    <img
                      key={index}
                      className="w-[20vh] h-[20vh] rounded-lg"
                      // src={`http://localhost:5000/${img.direction}`}
                      //! change
                      src={`${img.direction}`}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p>هنوز عکس فرعی انتخاب نشده</p>
            </div>
          )}
        </div>
      </div>
      {OpenAddImageModall && (
        <AddImageModallProduct
          setProduct={setProduct}
          Product={Product}
          setOpenAddImageModall={setOpenAddImageModall}
        />
      )}
    </div>
  );
};

export default AddImageTab;
