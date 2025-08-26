import React, { memo } from "react";
// import BtnOne from "../../utils/BtnOne";
import SliderAnimation from "../../utils/SliderAnimation";

interface SliderpageTestProps {
  img: string;
  topText: string;
  bottomText: string;
  simg:string| undefined;
}

const SliderpageTest: React.FC<SliderpageTestProps> = memo(
  ({ img, topText, bottomText, simg }) => {
    return (
      <div
        className="w-full h-[30vh] md:h-[40vh] my-5 lg:h-[70vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url('${img}')` }}
      >
        <div className="grid grid-cols-2 gap-2">
          <SliderAnimation>
          <div
            className="flex flex-col items-start justify-between md:justify-around h-[15vh] my-5 lg:mx-10
lg:h-[60vh]"
          >
            <h3 className="text-white font-bold ">{topText}</h3>
            <p className="font-tanha text-white">{bottomText}</p>
            {/* <div className="">
              <BtnOne />
              </div> */}
          </div>
              </SliderAnimation>

          <div className="mb-10">
            {simg && (
              <img src={simg} className="w-full h-auto" alt="Banner Content" />
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default SliderpageTest;

// <div className="w-full h-[40vh] my-5 lg:h-[70vh] relative">
// <div className="grid grid-cols-2 gap-5">
//   <div className="">
//     <div className="absolute bottom-2 right-5 lg:bottom-10 lg:right-32">
//       <BtnOne />
//     </div>
//     <SliderAnimation>
//       <h3 className="text-white font-bold absolute top-2 right-5 lg:top-16 lg:right-16">
//         {topText}
//       </h3>
//       <p className="font-tanha text-white  text-start absolute top-20 right-5 lg:top-44 lg:right-20 w-96">
//         {bottomText}
//       </p>
//     </SliderAnimation>
//   </div>
//   <div className="">
//     <img
//       src={simg}
//       className="absolute top-0 right-0 w-full h-full object-contain "
//       alt=""
//     />
//   </div>
// </div>

// <img className="w-full h-full" src={img} alt={topText} loading="lazy" />
// </div>
