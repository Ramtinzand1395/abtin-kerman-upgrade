import React from "react";
import img from "../../assets/PS5-Guide.webp";
import { Link } from "react-router-dom";

interface ShopingCardProps {
  title: string;
  price: number | string;
  _id: string;
  primaryImage?: string;
  additionalImages?: string[];
  averageRating?: number;
  tags?: string[];
}
const ShopingCard: React.FC<ShopingCardProps> = ({ title, price, _id }) => {
  return (
    <div className="flex flex-col cursor-pointer">
      <img src={img} className="rounded-t-lg" alt="" />

      <div className="flex md:items-center md:justify-between items-start flex-col md:flex-row my-2 md:my-4">
        <h4 className="font-semibold text-xs md:text-base font-tanha text-black">
          {title}
        </h4>
        <div className="">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-sm md:text-2xl ${
                star <= 3 ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <p className="my-2">قیمت :{price}</p>
      <button
        // onClick={() => onClick()}
        className={`relative rounded my-4 px-5 py-2.5 overflow-hidden group bg-primary hover:bg-gradient-to-r text-white hover:ring-2 hover:ring-offset-2  transition-all ease-out duration-300`}
      >
        {" "}
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
        <Link to={`product/${_id}`} className="relative">
          مشاهده بیشتر
        </Link>
      </button>
    </div>
  );
};

export default ShopingCard;

// return (
//   <div className="flex flex-col cursor-pointer">
//     <img src={img} className="rounded-t-lg" alt="" />

//     <div className="flex md:items-center md:justify-between items-start flex-col md:flex-row my-2 md:my-4">
//       <h4 className="font-semibold text-xs md:text-base font-tanha text-black">
//         دستگاه ps5 اسلیم اروپا
//       </h4>
//       <div className="">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <span
//             key={star}
//             className={`cursor-pointer text-sm md:text-2xl ${
//               star <= 3 ? "text-yellow-400" : "text-gray-400"
//             }`}
//           >
//             ★
//           </span>
//         ))}
//       </div>
//     </div>
//     <p className="my-2">قیمت :125,000,000</p>
//     <button
//       // onClick={() => onClick()}
//       className={`relative rounded my-4 px-5 py-2.5 overflow-hidden group bg-primary hover:bg-gradient-to-r text-white hover:ring-2 hover:ring-offset-2  transition-all ease-out duration-300`}
//     >
//       {" "}
//       <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
//       <Link to={`product/${_id}`} className="relative">
//         مشاهده بیشتر
//       </Link>
//     </button>
//   </div>
// );
// };

// export default ShopingCard;

// import React from "react";
// import { ImageType, Tag } from "../../types";
// import { Link } from "react-router-dom";
// interface CardItemProps {
//   title: string;
//   price: number;
//   primaryImage: ImageType | null;
//   additionalImages?: ImageType[];
//   _id?: string;
//   tags?: Tag[];
//   averageRating:number;
// }
// const ShopingCard: React.FC<CardItemProps> = ({
//   title,
//   price,
//   primaryImage,
//   _id,
//   tags,
//   averageRating
// }) => {
//   return (
//     <Link to={`/product/${_id}`}>
//       <div className="flex flex-col items-start rounded-lg cursor-pointer shadowhand relative p-4 min-h-[450px] bg-gradient-to-t to-secondery from-white">
//       <img
//           // src={`http://localhost:5000/${primaryImage?.direction}`}
//           //! change
//           src={`${primaryImage?.direction}`}
//           className="w-full  mb-2 object-contain rounded-lg  max-h-[40vh] "
//           alt={primaryImage?.imageName}
//         />
//         <div className="text-start">
//           <h4 className="font-bold font-tanha text-primary ">{title}</h4>
//           <p className="my-2 ">{price} قیمت</p>
//           <div className="">
//         {[1, 2, 3, 4, 5].map((star) => (
//               <span
//                 key={star}
//                 className={`cursor-pointer text-2xl ${
//                   star <= averageRating ? "text-yellow-400" : "text-gray-400"
//                 }`}
//               >
//                 ★
//               </span>
//             ))}
//         </div>
//           {tags?.map((tag) => (
//             <span key={tag._id} className="text-sm px-2 text-gray-500">
//               {tag.tagName}
//               {"#"}
//             </span>
//           ))}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ShopingCard;
