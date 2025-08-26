import { Helmet } from "react-helmet";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>درباره ما | کرمان آتاری</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="description"
          content="کرمان آتاری؛ خرید و فروش بازی‌های پلی‌استیشن، کنسول‌های PS4 و PS5 و لوازم جانبی اورجینال در کرمان. قیمت مناسب، کیفیت بالا و گارانتی معتبر. تماس: 09399943527"
        />
        <link rel="canonical" href="https://kermanatari.ir/about-us" />
      </Helmet>

      <section className="max-w-4xl mx-auto p-6 leading-8 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">درباره ما</h1>
        <p className="mb-4">
          کرمان آتاری یکی از قدیمی‌ترین فروشگاه‌های بازی در کرمان است که فعالیت
          خود را از سال ۱۳۴۰ آغاز کرده است. ما همواره تلاش کرده‌ایم با ارائه‌ی
          بازی‌های پلی‌استیشن، کنسول‌های سونی و لوازم جانبی مرتبط، تجربه‌ای
          متفاوت و مطمئن را برای مشتریان خود فراهم کنیم.
        </p>
        <p className="mb-4">
          در کرمان آتاری، اولویت ما رضایت مشتریان است. ما محصولات خود را با{" "}
          <span className="font-semibold">قیمت مناسب</span>،{" "}
          <span className="font-semibold">کیفیت تضمین‌شده</span> و{" "}
          <span className="font-semibold">گارانتی معتبر</span> عرضه می‌کنیم تا
          علاقه‌مندان به دنیای بازی بتوانند با خیال راحت خرید کنند.
        </p>
        <p className="mb-4">
          خدمات ما شامل خرید و فروش انواع <strong>بازی پلی‌استیشن</strong>{" "}
          (به‌صورت دیسک و اکانتی)، <strong>کنسول‌های PS4 و PS5</strong> و همچنین{" "}
          <strong>لوازم جانبی اورجینال</strong> است. مشتریان ما همیشه از{" "}
          <strong>سرعت در ارائه خدمات</strong> و{" "}
          <strong>پشتیبانی دوستانه</strong> رضایت داشته‌اند.
        </p>
        <p>
          کرمان آتاری با بیش از شش دهه تجربه، امروز نیز همراه شماست تا بهترین
          لحظات بازی را با خانواده و دوستانتان بسازید. 🌟
        </p>
      </section>
    </>
  );
};

export default AboutUs;
