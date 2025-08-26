import React from "react";
import logo from "../../assets/4062c9fc8b3a999778ed824b24631ab0.jpg";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-700 grid grid-cols-1 md:grid-cols-6  gap-10 h-auto md:h-[60vh] p-10 text-xs md:text-base">
      <div className="md:col-span-3 text-white flex flex-col items-start justify-evenly">
        {" "}
        <div className="flex items-center ">
          <img src={logo} className="w-[5vw] h-[5vw] rounded-full" alt="Logo" />
          <h2 className="font-light md:font-bold mb-5 md:mb-0 mr-2 text-white whitespace-nowrap">
            کرمان آتاری
          </h2>
        </div>
        <p className="my-2">
          کرمان آتاری از سال ۱۳۴۰ فعالیت خود را در زمینه خرید و فروش بازی‌های
          پلی‌استیشن و کنسول‌های سونی در کرمان آغاز کرده است. ما با بیش از چند
          دهه تجربه و عشق به دنیای گیم، همواره تلاش کرده‌ایم تا بهترین و
          جدیدترین بازی‌ها و دستگاه‌های پلی‌استیشن را با قیمت مناسب، کیفیت بالا
          و گارانتی معتبر در اختیار مشتریان عزیزمان قرار دهیم. در کرمان آتاری،
          می‌توانید انواع بازی پلی‌استیشن، بازی اکانتی، کنسول پلی‌استیشن 4 و
          پلی‌استیشن 5 و لوازم جانبی اصلی را پیدا کنید. هدف ما ایجاد تجربه‌ای
          سریع، مطمئن و لذت‌بخش برای گیمرهای حرفه‌ای و علاقه‌مندان تازه‌کار است.
        </p>
        <div className="w-20 md:w-32 h-[2px] bg-[#5cc1b9] my-5"></div>
        <div className="flex flex-col">
          <span>شماره تماس: 09383077225</span>
          <span> آدرس: کرمان-میدان شهدا-خیابان زریسف-جنب داروخانه</span>{" "}
          <span>شبکه های اجتماعی: kermanatari.ir@</span>
        </div>
      </div>
      <div className="flex-col flex items-start justify-evenly text-white">
        <h3>نحوه سفارش</h3>
        <div className="w-20 md:w-32 h-[2px] bg-[#5cc1b9] my-5"></div>

        <p>چطور سفارش بدم؟</p>
        <p>شرایط ارسال چطوره؟</p>
        <p>پرداخت هزینه</p>
        <p>چرا به شما اعتماد کنم؟</p>
        <p>ضمانت چه شرایطی داره؟</p>
        <p>آیا امکان عودت وجود داره؟</p>
      </div>
      <div className="flex-col flex items-start justify-evenly text-white">
        <h3 className="md:whitespace-nowrap">درباره کرمان آتاری</h3>
        <div className="w-20 md:w-32 h-[2px] bg-[#5cc1b9] my-5"></div>
        <Link to={"/about-us"}>درباره ما</Link>
        <Link to={"/contact-us"}>تماس با ما</Link>
        <p>روش های ارسال کالا</p>
        <p>سپند در شبکه های اجتماعی</p>
        <p>تبلیغات</p>
        <p>شرایط عودت کالا</p>
      </div>{" "}
      <div className="flex-col flex items-start justify-evenly text-white">
        <h3>اعتماد</h3>
        <div className="w-20 md:w-32 h-[2px] bg-[#5cc1b9] my-5"></div>
        <p> نماد الکترونیکی</p>
        <p>ضمانت بازگشت وجه</p>
        <p>باشگاه مشتریان</p>
        <p>آدرس فروشگاه فیزیکی</p>
        <p>مورد آزمایشی</p>
        <p>مورد آزمایشی دو</p>
      </div>
    </div>
  );
};

export default Footer;
