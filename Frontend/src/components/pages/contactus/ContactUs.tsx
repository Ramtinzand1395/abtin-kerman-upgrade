import React from "react";
import { Helmet } from "react-helmet";

const ContactUs = () => {
  return (
    <>
      <Helmet>
        <title>تماس با ما | کرمان آتاری</title>
        <meta
          httpEquiv="Content-Type"
          content="text/html; charset=utf-8"
        />
        <meta
          name="description"
          content="تماس با کرمان آتاری؛ خرید و فروش بازی‌های پلی‌استیشن، کنسول‌های PS4 و PS5 و لوازم جانبی اورجینال در کرمان. برای سفارش و پشتیبانی با ما در ارتباط باشید. تلفن: 09399943527"
        />
        <link rel="canonical" href="https://kermanatari.ir/contact-us" />
      </Helmet>

      <section className="max-w-4xl mx-auto p-6 leading-8 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">تماس با ما</h1>
        <p className="mb-4">
          خوشحال می‌شویم در هر زمان پاسخگوی شما باشیم. برای خرید، سفارش و یا
          پشتیبانی محصولات، می‌توانید از راه‌های ارتباطی زیر با ما در تماس باشید.
        </p>

        <div className="bg-gray-100 p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">اطلاعات تماس</h2>
          <p>
            <strong>تلفن:</strong>{" "}
            <a href="tel:+989399943527" className="text-blue-600">
              093999943527
            </a>
          </p>
          <p>
            <strong>ایمیل:</strong>{" "}
            <a href="mailto:info@kermanatari.ir" className="text-blue-600">
              info@kermanatari.ir
            </a>
          </p>
          <p>
            <strong>آدرس:</strong> 
            کرمان-میدان شهدا-خیابان زریسف-جنب داروخانه
          
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-2">فرم تماس</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="نام و نام خانوادگی"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            placeholder="ایمیل"
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            placeholder="پیام شما"
            className="w-full p-3 border rounded-lg h-32"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            ارسال پیام
          </button>
        </form>
      </section>
    </>
  );
};

export default ContactUs;
