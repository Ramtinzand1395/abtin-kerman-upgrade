import React from "react";
import { Helmet } from "react-helmet";

const Topheader: React.FC = () => {
  const contactItems = [
    {
      id: "support",
      icon: (
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
            fill="#fff"
          />
        </svg>
      ),
      title: "ایمیل پشتیبانی",
      text: " kermanatari.ir@gmail.com",
    },
    {
      id: "order-tracking",
      icon: (
        <svg
          fill="#000000"
          width="30px"
          height="30px"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>mobile</title>
          <path
            fill="#fff"
            d="M22 1.25h-12c-1.518 0.002-2.748 1.232-2.75 2.75v24c0.002 1.518 1.232 2.748 2.75 2.75h12c1.518-0.002 2.748-1.232 2.75-2.75v-24c-0.002-1.518-1.232-2.748-2.75-2.75h-0zM23.25 28c-0.001 0.69-0.56 1.249-1.25 1.25h-12c-0.69-0.001-1.249-0.56-1.25-1.25v-24c0.001-0.69 0.56-1.249 1.25-1.25h12c0.69 0.001 1.249 0.56 1.25 1.25v0zM18 25.75h-4c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h4c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0z"
          ></path>
        </svg>
      ),
      title: "پیگیری سفارش",
      text: "09383077225",
    },
    {
      id: "address",
      icon: (
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "آدرس",
      text: "کرمان-میدان شهدا-خیابان زریسف-جنب داروخانه",
    },
  ];
  return (
    <>
      <Helmet>
        <title>
          کرمان آتاری | خرید و فروش بازی پلی‌استیشن و کنسول PS4 , PS5 در کرمان
        </title>
        <meta
          name="description"
          content="کرمان آتاری مرکز خرید و فروش بازی پلی‌استیشن، کنسول‌های PS4 و PS5 و لوازم جانبی اورجینال در کرمان. بهترین قیمت، کیفیت تضمینی و ارسال سریع. همین حالا سفارش دهید."
        />
        <meta
          name="keywords"
          content="بازی پلی‌استیشن, خرید بازی PS4, خرید بازی PS5, پلی‌استیشن در کرمان, دستگاه PS5, کرمان آتاری"
        />
        <link rel="canonical" href="https://kermanatari.ir/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="کرمان آتاری | خرید و فروش بازی پلی‌استیشن و کنسول سونی"
        />
        <meta
          property="og:description"
          content="خرید و فروش بازی‌های پلی‌استیشن و کنسول‌های PS4 و PS5 در کرمان. کیفیت بالا، قیمت مناسب و گارانتی خرید."
        />
        <meta property="og:url" content="https://kermanatari.ir/" />
        <meta
          property="og:image"
          content="https://kermanatari.ir/images/ps5.jpg"
        />
      </Helmet>
      <div className="bg-primary p-2 flex items-center justify-around  mb-2">
        {contactItems.map(({ id, icon, text, title }) => (
          <div className="items-center hidden md:flex" key={id}>
            {icon}
            <p className="text-white mx-2 font-light">{title}</p>
            <span className="text-white ">{text}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Topheader;
