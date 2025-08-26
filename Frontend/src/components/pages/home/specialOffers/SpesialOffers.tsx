import takhfif from "../../../../assets/discountpng.parspng.com-6.png";
// import OffSwiperSlide_1 from "./OffSwiperSlide_1";
// swiper core styles
import "swiper/css";
// modules styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// import { useEffect, useState } from "react";
// import { GameData } from "../../../../types";
// import { getGameService } from "../../../../services/ApiServices";
import ShopingCard from "../../../utils/ShopingCard";
const SpesialOffers = () => {
  // const [Games, setGames] = useState<GameData[]>([]);

  // useEffect(() => {
  //   const getGames = async () => {
  //     const pageNumber = 1;
  //     const orderDesc = "newestFirst";
  //     try {
  //       const { data } = await getGameService(pageNumber, orderDesc);
  //       setGames(data.games);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getGames();
  // }, []);
  return (
    <div className="w-full flex items-center  shadow-2xl p-2">
      <div className="flex items-center justify-center ml-2 flex-col bg-primary rounded-lg h-[250px] md:h-auto p-2 md:p-5">
        <img src={takhfif} className="h-full md:w-40 w-20" alt="" />
        <button className="bg-[#f54952] font-tanha text-white  py-1 md:px-4 px-2 text-sm whitespace-nowrap">
          مشاهده همه
        </button>
      </div>
      <Swiper
        style={
          {
            // "--swiper-navigation-color": "#f54952",
            // "--swiper-navigation-size": "30px",
          }
        }
        modules={[Navigation]}
        freeMode={true}
        slidesPerView={4}
        dir="rtl"
        // navigation={true}
        autoplay={{
          delay: 2000,
          // pauseOnMouseEnter: "true",
          // waitForTransition: "false",
          // disableOnInteraction: "false",
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
        {/* {Games.map((item, index) => (
          <SwiperSlide key={index}>
            <ShopingCard
              title={item.title}
              price={item.info[0].price}
              primaryImage={item.primaryImage}
              _id={item._id}
              tags={item.tags}
              averageRating={item.averageRating}
            />
          </SwiperSlide>
        ))} */}
        <SwiperSlide>
          <ShopingCard />
        </SwiperSlide>
        <SwiperSlide>
          <ShopingCard />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <ShopingCard />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <ShopingCard />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <ShopingCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SpesialOffers;
