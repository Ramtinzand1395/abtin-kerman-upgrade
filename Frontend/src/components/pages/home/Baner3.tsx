import React from "react";
import img from "../../../assets/baner3/OIP.webp";
import img2 from "../../../assets/baner3/پایه-چندمنظوره-PS5-دابی-RGB-مدل-TP5-3528.webp";
import img3 from "../../../assets/baner3/کیف-حمل-کنسول-ps5-پلی-استیشن-5-اسلیم-بافت-مخملی-مشکی-2.webp";
import Animations from "../../utils/Animations";

const Baner3: React.FC = () => {
  return (
    <div className="">
      <Animations>
        <div className="flex items-center mt-10 mb-2">
          <h2 className="font-bold text-lg lg:text-2xl whitespace-nowrap my-5">
            محصولات جانبی پلی استیشین
          </h2>
          <div className="w-full h-[8px] rounded-3xl bg-primary"></div>
        </div>
      </Animations>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5 ">
        <img src={img3} className="max-h-[600px] w-full" alt="" />
        <div className=" space-y-3">
          <img
            src={img2}
            className="max-h-[300px] w-full  p-2 rounded-3xl"
            alt=""
          />

          <img
            src={img}
            className="max-h-[300px] w-full p-2 rounded-3xl"
            alt=""
          />
        </div>
      </div>
      <button
        // onClick={() => onClick()}
        className={`relative rounded my-4 px-5 py-2.5 overflow-hidden group bg-primary hover:bg-gradient-to-r text-white hover:ring-2 hover:ring-offset-2  transition-all ease-out duration-300`}
      >
        {" "}
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
        <span className="relative">مشاهده بیشتر</span>
      </button>
    </div>
  );
};

export default Baner3;
