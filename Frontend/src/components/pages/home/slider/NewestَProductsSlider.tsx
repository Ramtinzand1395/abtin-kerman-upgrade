import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper core and required modules
import { Navigation, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "./newestَProductsSlider.css";
import Animations from "../../../utils/Animations";
import { getProductsService } from "../../../../services/ApiServices";
import ShopingCard from "../../../utils/ShopingCard";
import { Product } from "../../../../types";
import LeftAnimation from "../../../utils/LeftAnimation";
import { toast } from "react-toastify";

const NewestProductsSlider: React.FC = () => {
  const [Products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const { data } = await getProductsService(1, "newestFirst");
        setProducts(data.products);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return <div className="loader">Loading...</div>; // Add a loading indicator
  }

  if (error) {
    toast.error(error);
  }
  return (
    <div className="my-10">
      <Animations>
        <div className="flex items-center mt-10 mb-2">
          <h2 className="font-bold text-lg lg:text-2xl whitespace-nowrap my-5">
            جدید ترین محصولات
          </h2>
          <div className="w-full h-[8px] rounded-3xl bg-primary"></div>
        </div>
      </Animations>
      <LeftAnimation>
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          // loop={true}
          // autoplay={{ delay: 2500, disableOnInteraction: false }}
          scrollbar={{ draggable: true }}
          className="p-5"
        >
          {Products.map((product) => (
            <SwiperSlide key={product._id}>
              <ShopingCard
                title={product.title}
                price={product.price}
                primaryImage={product.primaryImage}
                additionalImages={product.additionalImages}
                _id={product._id}
                tags={product.tags}
                averageRating={product.averageRating}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </LeftAnimation>
    </div>
  );
};

export default NewestProductsSlider;
