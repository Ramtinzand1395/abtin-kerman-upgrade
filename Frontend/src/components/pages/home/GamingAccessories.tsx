import { Swiper, SwiperSlide } from "swiper/react";
import Animations from "../../utils/Animations";
import img from "../../../assets/acceesories/OIP (1).webp";
import img1 from "../../../assets/acceesories/OIP (2).webp";
import img2 from "../../../assets/acceesories/R.jpeg";
import img3 from "../../../assets/acceesories/best-gaming-mouses-65548de2ac3634182f48c7a3.jpeg";

const GamingAccessories = () => {
  return (
    <div>
      <Animations>
        <div className="flex items-center mt-10 mb-2">
          <h2 className="font-bold text-lg lg:text-2xl whitespace-nowrap my-5">
            محصولات جانبی گیمینگ
          </h2>
          <div className="w-full h-[8px] rounded-3xl bg-primary"></div>
        </div>
      </Animations>
      <Swiper
        freeMode={true}
        slidesPerView={4}
        dir="rtl"
        autoplay={{
          delay: 2000,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          "@0.75": {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
      >
        <SwiperSlide>
          <div className="flex flex-col cursor-pointer">
            <img src={img} className="rounded-t-lg" alt="" />

            <div className="flex md:items-center md:justify-between items-start flex-col md:flex-row my-2 md:my-4">
              <h4 className="font-semibold text-xs md:text-base font-tanha text-black">
                دستگاه ps5 اسلیم اروپا
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
            <p className="my-2">قیمت :125,000,000</p>
            <button
              // onClick={() => onClick()}
              className={`relative rounded my-4 px-5 py-2.5 overflow-hidden group bg-primary hover:bg-gradient-to-r text-white hover:ring-2 hover:ring-offset-2  transition-all ease-out duration-300`}
            >
              {" "}
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">مشاهده بیشتر</span>
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col cursor-pointer">
            <img src={img1} className="rounded-t-lg" alt="" />

            <div className="flex md:items-center md:justify-between items-start flex-col md:flex-row my-2 md:my-4">
              <h4 className="font-semibold text-xs md:text-base font-tanha text-black">
                دستگاه ps5 اسلیم اروپا
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
            <p className="my-2">قیمت :125,000,000</p>
            <button
              // onClick={() => onClick()}
              className={`relative rounded my-4 px-5 py-2.5 overflow-hidden group bg-primary hover:bg-gradient-to-r text-white hover:ring-2 hover:ring-offset-2  transition-all ease-out duration-300`}
            >
              {" "}
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">مشاهده بیشتر</span>
            </button>
          </div>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <div className="flex flex-col cursor-pointer">
            <img src={img1} className="rounded-t-lg" alt="" />

            <div className="flex md:items-center md:justify-between items-start flex-col md:flex-row my-2 md:my-4">
              <h4 className="font-semibold text-xs md:text-base font-tanha text-black">
                دستگاه ps5 اسلیم اروپا
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
            <p className="my-2">قیمت :125,000,000</p>
            <button
              // onClick={() => onClick()}
              className={`relative rounded my-4 px-5 py-2.5 overflow-hidden group bg-primary hover:bg-gradient-to-r text-white hover:ring-2 hover:ring-offset-2  transition-all ease-out duration-300`}
            >
              {" "}
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">مشاهده بیشتر</span>
            </button>
          </div>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <div className="flex flex-col cursor-pointer">
            <img src={img2} className="rounded-t-lg" alt="" />

            <div className="flex md:items-center md:justify-between items-start flex-col md:flex-row my-2 md:my-4">
              <h4 className="font-semibold text-xs md:text-base font-tanha text-black">
                دستگاه ps5 اسلیم اروپا
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
            <p className="my-2">قیمت :125,000,000</p>
            <button
              // onClick={() => onClick()}
              className={`relative rounded my-4 px-5 py-2.5 overflow-hidden group bg-primary hover:bg-gradient-to-r text-white hover:ring-2 hover:ring-offset-2  transition-all ease-out duration-300`}
            >
              {" "}
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">مشاهده بیشتر</span>
            </button>
          </div>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <div className="flex flex-col cursor-pointer">
            <img src={img3} className="rounded-t-lg" alt="" />

            <div className="flex md:items-center md:justify-between items-start flex-col md:flex-row my-2 md:my-4">
              <h4 className="font-semibold text-xs md:text-base font-tanha text-black">
                دستگاه ps5 اسلیم اروپا
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
            <p className="my-2">قیمت :125,000,000</p>
            <button
              // onClick={() => onClick()}
              className={`relative rounded my-4 px-5 py-2.5 overflow-hidden group bg-primary hover:bg-gradient-to-r text-white hover:ring-2 hover:ring-offset-2  transition-all ease-out duration-300`}
            >
              {" "}
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">مشاهده بیشتر</span>
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default GamingAccessories;
