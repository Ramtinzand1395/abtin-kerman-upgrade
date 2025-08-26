import React, { useEffect, useState } from "react";
import {
  addUserFavoritesService,
  getProductService,
  getUserFavoriteService,
} from "../../../../services/ApiServices";
import { useParams } from "react-router-dom";
import BtnIcon from "../../../utils/BtnIcon";
import ConnectedProducts from "../../../utils/ConnectedProducts";
import { decodedUser, FavoritesProps, Product } from "../../../../types";
import Tabs from "../../../utils/tab/Tabs";
import { useShopingcard } from "../../../context/ShopingCard";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";
import { AxiosError } from "axios";

const ProductPage: React.FC = () => {
  const { InceraseCardQty, removeFromCard, DecreaseCardQty, getItemqty } =
    useShopingcard();
  const [Product, setProduct] = useState<Product>();
  const [Favorites, setFavorites] = useState<FavoritesProps[]>([]);
  const { productId } = useParams();

  const [currentImage, setCurrentImage] = useState<string>("");
  useEffect(() => {
    const getProduct = async () => {
      if (!productId) return;
      try {
        const { data } = await getProductService(productId);
        const user = localStorage.getItem("User") || "{}";
        const decodedToken = jwtDecode<decodedUser>(user);
        if (user) {
          const { data: favorites } = await getUserFavoriteService(
            decodedToken.userId
          );
          setFavorites(favorites.favorites);
        }
        setProduct(data);
        setCurrentImage(data?.primaryImage?.direction);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [productId]);

  const handleAddToCart = () => {
    const data = {
      title: Product?.title || "",
      image: Product?.primaryImage || {
        imageName: "",
        direction: "",
        createdAt: "",
        _id: "",
      },
      mainQty: Product?.quantity || 0,
      price: Product?.price || 0,
      features: Product?.features || [],
      tags: Product?.tags || [],
    };
    Product?._id && InceraseCardQty(Product?._id, null, data);
  };
  const handleImageClick = (imageDirection: string) => {
    setCurrentImage(imageDirection);
  };
  const qty = Product?._id && getItemqty(Product?._id);

  const CopyLinkButton = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("لینک با موفقیت کپی شد");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };
  const handleAddToFavorites = async () => {
    const user = localStorage.getItem("User") || "{}";
    const decodedToken = jwtDecode<decodedUser>(user);
    try {
      if (productId) {
        const { data } = await addUserFavoritesService(
          decodedToken.userId,
          productId,
          "Product"
        );
        setFavorites(data.favorites);
        toast.success(data.message);
      }
      } catch (err) {
      // Type the error as AxiosError
      if (err instanceof AxiosError) {
        // Accessing the error response message
        if (err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("An error occurred, please try again.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.log(err);
    }
  };

  return (
    <div className="md:container md:mx-auto mx-2">
       <Helmet>
      <title>{Product?.title }</title>
      <meta name="description" content="Browse our product." />
      </Helmet>
      <div className="grid grid-cols-12 gap-5">
        {/* قسمت نمایش محصول */}
        <div className="col-span-12 md:col-span-8 border-2 rounded-lg p-5 mb-10  flex md:flex-row flex-col-reverse justify-around">
          <div
            className="
      flex justify-center flex-col
      order-1 md:order-2
      "
          >
            {/* آیکون ها */}
            <div className="flex items-center justify-around w-full">
              <button
                onClick={CopyLinkButton}
                title="Icon"
                className="border-2 p-2 shadow-md"
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12C9 13.3807 7.88071 14.5 6.5 14.5C5.11929 14.5 4 13.3807 4 12C4 10.6193 5.11929 9.5 6.5 9.5C7.88071 9.5 9 10.6193 9 12Z"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M14 6.5L9 10"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 17.5L9 14"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>

              <button title="Icon" className="border-2 p-2 shadow-md">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="-0.5 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>comments</title>
                  <desc>Created with Sketch Beta.</desc>
                  <defs></defs>
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Icon-Set"
                      transform="translate(-257.000000, -255.000000)"
                      fill="#000000"
                    >
                      <path
                        d="M259,266.5 C259,261.254 263.753,257 270,257 C274.973,257 280,261.254 280,266.5 C280,271.747 276.075,276 270,276 C269.107,276 267.244,275.898 266.413,275.725 L263,278 L263,274.456 C260.561,272.477 259,269.834 259,266.5 L259,266.5 Z M266.637,277.736 C267.414,277.863 269.181,278 270,278 C277.18,278 282,272.657 282,266.375 C282,260.093 275.977,255 270,255 C262.811,255 257,260.093 257,266.375 C257,270.015 258.387,273.104 261,275.329 L261,281 L266.637,277.736 L266.637,277.736 Z M283.949,264.139 C283.968,264.425 284,264.709 284,265 C284,265.636 283.938,266.259 283.849,266.874 C285.195,268.45 286,270.392 286,272.5 C286,275.834 284.008,278.761 281,280.456 L281,284 L277.587,281.725 C276.756,281.898 275.893,282 275,282 C272.41,282 271.034,281.222 269.154,279.929 C268.609,279.973 268.059,280 267.5,280 C267.102,280 266.712,279.972 266.32,279.949 C268.701,282.276 271.149,283.75 275,283.75 C275.819,283.75 276.618,283.676 277.395,283.549 L283,287 L283,281.329 C286.04,279.246 288,276.015 288,272.375 C288,269.131 286.439,266.211 283.949,264.139 L283.949,264.139 Z M275.5,268 C276.329,268 277,267.329 277,266.5 C277,265.672 276.329,265 275.5,265 C274.671,265 274,265.672 274,266.5 C274,267.329 274.671,268 275.5,268 L275.5,268 Z M263.5,268 C264.329,268 265,267.329 265,266.5 C265,265.672 264.329,265 263.5,265 C262.671,265 262,265.672 262,266.5 C262,267.329 262.671,268 263.5,268 L263.5,268 Z M269.5,268 C270.329,268 271,267.329 271,266.5 C271,265.672 270.329,265 269.5,265 C268.671,265 268,265.672 268,266.5 C268,267.329 268.671,268 269.5,268 L269.5,268 Z"
                        id="comments"
                      ></path>
                    </g>
                  </g>
                </svg>
              </button>

              <button
                onClick={handleAddToFavorites}
                title="Icon"
                className="border-2 p-2 shadow-md"
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill={`${
                    Favorites.some(
                      (favorite) => favorite.itemId.toString() === productId
                    )
                      ? "#FF0000"
                      : "#fff"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <img
              // src={`http://localhost:5000/${currentImage}`}
              //! change
              src={`${currentImage}`}
              alt=""
              className="w-full h-full object-contain max-w-[300px] max-h-[300px] my-5"
            />
            <div className=" items-center hidden md:flex">
              {Product?.additionalImages?.map((img) => (
                <img
                  key={img._id}
                  // src={`http://localhost:5000/${img?.direction}`}
                  //! change
                  src={`${img?.direction}`}
                  alt=""
                  className="w-full h-full object-contain max-w-[70px] max-h-[70px] border-2 border-primary p-2 cursor-pointer"
                  onClick={() => handleImageClick(img?.direction)}
                />
              ))}
              <img
                // src={`http://localhost:5000/${Product?.primaryImage?.direction}`}
                //! change
                src={`${Product?.primaryImage?.direction}`}
                alt=""
                className="w-full h-full object-contain max-w-[70px] max-h-[70px] border-2 border-primary p-2 mx-2 cursor-pointer"
                onClick={() =>
                  Product?.primaryImage?.direction &&
                  handleImageClick(Product?.primaryImage?.direction)
                }
              />
            </div>
          </div>

          <div className="">
            <div className="flex flex-col">
              <h3 className="my-2 text-primary">{Product?.title}</h3>
              <label className="text-secondery mb-10">
                نظرات کاربران :
                <span className="mr-2">{Product?.comments?.length}</span>
                نظر
              </label>
            </div>
            <label className="text-secondery border-t-2 pt-2">
              {" "}
              مشخصات اصلی
            </label>
            <div className="border-2 border-secondery rounded-lg w-full md:w-[30vw] p-3 mt-4">
              <ul>
                {Product?.Specifications?.map((feature, index) => (
                  <li className="my-4 border-b-2 p-1" key={index}>
                    <span className="text-gray-600">{feature.key}:</span>{" "}
                    {feature.value}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center">
              {Product?.tags?.map((tag) => (
                <p key={tag._id} className="m-2 text-secondery mt-5">
                  {tag.tagName}#
                </p>
              ))}
            </div>
          </div>
        </div>
        {/* قسمت سبد خرید صفحه */}
        <div
          className=" 
        rounded-lg border-2 w-full bg-white z-20 lg:z-0
        fixed bottom-0 mb-0  p-2 col-span-0
        md:relative md:mb-10 md:col-span-4 md:p-5 flex flex-col items-start justify-between"
        >
          <div
            className="
           p-5 rounded-md
          hidden mb-2
          md:block
          "
          >
            <p className="font-bold">{Product?.title}</p>
            <p className="text-sm text-gray-400 mt-5">{Product?.description}</p>
          </div>
          <div
            className="
             h-full p-5 rounded-md w-full
          hidden mb-5
          md:block
          "
          >
            <p className="font-tanha mb-2 bg-blue-50   p-5 rounded-xl">
              فروشنده : کرمان آتاری
            </p>
            <p className="font-tanha mb-2 bg-blue-50   p-5 rounded-xl">
              ارزیابی عملکرد : عای
            </p>
            <p className="font-tanha mb-2 bg-blue-50   p-5 rounded-xl">
              تحویل : 5 روز کاری
            </p>
            <p
              className={`font-tanha mb-2 bg-blue-50  p-5 rounded-xl ${
                Product?.inStock ? "text-green-700" : "text-red-700"
              }`}
            >
              وضعیت انبار :{" "}
              {Product?.inStock
                ? `  ${Product?.quantity} عدد  موجود در انبار `
                : "موجود نیست"}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold  text-xl mb-2">
              {Product?.price} تومان
            </p>
            {qty && qty > 0 ? (
              <div className="flex items-center justify-around border-2 rounded-lg py-2 w-32 bg-white">
                {qty < Number(Product.quantity) ? (
                  <svg
                    className="cursor-pointer text-secondery"
                    onClick={() =>
                      Product._id &&
                      InceraseCardQty(Product._id, null, {
                        title: "",
                        image: {
                          imageName: "",
                          direction: "",
                          createdAt: "",
                          _id: "",
                        },
                        mainQty: 0,
                        price: 0,
                        features: [],
                        tags: [],
                      })
                    }
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
                ) : (
                  <p className="text-red-500 font-bold">حداکثر</p>
                )}

                <span className=" text-secondery">{qty}</span>
                {qty === 1 ? (
                  <svg
                    className="cursor-pointer text-secondery"
                    onClick={() => Product?._id && removeFromCard(Product?._id)}
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20.5 6H3.49988"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.5 11L10 16"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14.5 11L14 16"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    className="cursor-pointer text-secondery"
                    onClick={() =>
                      Product?._id && DecreaseCardQty(Product?._id)
                    }
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12L18 12"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ) : (
              <BtnIcon
                ButtonColor="bg-purple-500 group-hover:bg-purple-600"
                ButtonText={`افزودن به سبد خرید`}
                onClick={handleAddToCart}
                ButtonIcon={
                  <svg
                    width="22px"
                    height="22px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.5285 6C16.5098 5.9193 16.4904 5.83842 16.4701 5.75746C16.2061 4.70138 15.7904 3.55383 15.1125 2.65C14.4135 1.71802 13.3929 1 12 1C10.6071 1 9.58648 1.71802 8.88749 2.65C8.20962 3.55383 7.79387 4.70138 7.52985 5.75747C7.50961 5.83842 7.49016 5.9193 7.47145 6H5.8711C4.29171 6 2.98281 7.22455 2.87775 8.80044L2.14441 19.8004C2.02898 21.532 3.40238 23 5.13777 23H18.8622C20.5976 23 21.971 21.532 21.8556 19.8004L21.1222 8.80044C21.0172 7.22455 19.7083 6 18.1289 6H16.5285ZM8 11C8.57298 11 8.99806 10.5684 9.00001 9.99817C9.00016 9.97438 9.00044 9.9506 9.00084 9.92682C9.00172 9.87413 9.00351 9.79455 9.00718 9.69194C9.01451 9.48652 9.0293 9.18999 9.05905 8.83304C9.08015 8.57976 9.10858 8.29862 9.14674 8H14.8533C14.8914 8.29862 14.9198 8.57976 14.941 8.83305C14.9707 9.18999 14.9855 9.48652 14.9928 9.69194C14.9965 9.79455 14.9983 9.87413 14.9992 9.92682C14.9996 9.95134 14.9999 9.97587 15 10.0004C15 10.0004 15 11 16 11C17 11 17 9.99866 17 9.99866C16.9999 9.9636 16.9995 9.92854 16.9989 9.89349C16.9978 9.829 16.9957 9.7367 16.9915 9.62056C16.9833 9.38848 16.9668 9.06001 16.934 8.66695C16.917 8.46202 16.8953 8.23812 16.8679 8H18.1289C18.6554 8 19.0917 8.40818 19.1267 8.93348L19.86 19.9335C19.8985 20.5107 19.4407 21 18.8622 21H5.13777C4.55931 21 4.10151 20.5107 4.13998 19.9335L4.87332 8.93348C4.90834 8.40818 5.34464 8 5.8711 8H7.13208C7.10465 8.23812 7.08303 8.46202 7.06595 8.66696C7.0332 9.06001 7.01674 9.38848 7.00845 9.62056C7.0043 9.7367 7.00219 9.829 7.00112 9.89349C7.00054 9.92785 7.00011 9.96221 7 9.99658C6.99924 10.5672 7.42833 11 8 11ZM9.53352 6H14.4665C14.2353 5.15322 13.921 4.39466 13.5125 3.85C13.0865 3.28198 12.6071 3 12 3C11.3929 3 10.9135 3.28198 10.4875 3.85C10.079 4.39466 9.76472 5.15322 9.53352 6Z"
                      fill="#fff"
                    />
                  </svg>
                }
              />
            )}
          </div>
        </div>
      </div>
      {Product && <Tabs Product={Product} />}
      <ConnectedProducts />
    </div>
  );
};

export default ProductPage;
