import React from "react";
import Card from "../utils/Card";
import img from "../../assets/_24c0f808-1d10-4db6-85a5-ed48e14014cf.jpg";

const ConnectedProducts: React.FC = () => {
  const CardIthem = [
    {
      id: 1,
      OpenTags: false,
      OpenDiscount: false,
      title: "بامپر فلزی نیلکین آیفون Nillkin Barde Metal Case iPhone 7 Plus",
      price: 120000,
      btnText: "افزودن به سبد خرید",
      image: img,
      category: "playstation-4",
    },
    {
      id: 2,
      OpenTags: true,
      OpenDiscount: true,
      discount: 50,
      title: "بامپر فلزی نیلکین آیفون Nillkin Barde Metal Case iPhone 7 Plus",
      price: 120000,
      btnText: "افزودن به سبد خرید",
      image: img,
      category: "playstation-4",
    },
    {
      id: 3,
      title: "بامپر فلزی نیلکین آیفون ",
      price: 120000,
      btnText: "افزودن به سبد خرید",
      image: img,
      category: "playstation-5",
    },
    {
      id: 4,
      OpenTags: true,
      title: "بامپر فلزی نیلکین آیفون Nillkin Barde Metal Case iPhone 7 Plus",
      price: 120000,
      btnText: "افزودن به سبد خرید",
      image: img,
      category: "playstation-5",
    },
  ];
  return (
    <div className="">
      <h3 className="font-bold text-2xl my-5">محصولات مشابه</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {CardIthem.map((card) => (
          <Card
            key={card.id}
            OpenTag={card.OpenTags}
            title={card.title}
            price={card.price}
            btnText={card.btnText}
            image={card.image}
            discount={card.discount}
            OpenDiscount={card.OpenDiscount}
          />
        ))}
      </div>
    </div>
  );
};

export default ConnectedProducts;
