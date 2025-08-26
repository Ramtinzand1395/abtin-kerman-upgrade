// import React, { useEffect } from "react";
// import { zarinpalCheckService } from "../../services/ApiServices";
// import { toast } from "react-toastify";

// const PaymentCheck: React.FC = () => {
//   useEffect(() => {
//     const orderId = localStorage.getItem("orderId")
//     const searchParams = new URLSearchParams(window.location.search);
//     const authority = searchParams.get("Authority");
//     const status = searchParams.get("Status");
//     const getvalidation = async () => {
//       try {
//         const { data } = await zarinpalCheckService(authority, status , orderId);
//         console.log(data);
//         if(data.status === 200){
//             toast.success("پرداخت موفقیت آمیز بود")
//             localStorage.removeItem("orderId")
//             localStorage.removeItem("shopping-card")
//             window.location.href = "https://kermanatari.ir/";

//         }else{
//             toast.error("پرداخت موفقیت آمیز نبود")

//             window.location.href = "https://kermanatari.ir/";
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     console.log("Authority:", authority);
//     console.log("Status:", status);
//     getvalidation();
//   }, []);
//   return <div>PaymentCheck</div>;
// };

// export default PaymentCheck;

import React, { useEffect } from "react";
import { zarinpalCheckService } from "../../services/ApiServices";
import { toast } from "react-toastify";

const PaymentCheck: React.FC = () => {
  useEffect(() => {
    const checkPayment = async () => {
      const orderId = localStorage.getItem("orderId");
      const searchParams = new URLSearchParams(window.location.search);
      const authority = searchParams.get("Authority");
      const status = searchParams.get("Status");

      if (!authority || !status || !orderId) {
        toast.error("اطلاعات پرداخت ناقص است.");
        window.location.href = "https://kermanatari.ir/";
        return;
      }

      try {
        const { data } = await zarinpalCheckService(authority, status, orderId);

        if (data.status === 200) {
          toast.success("پرداخت با موفقیت انجام شد.");
          localStorage.removeItem("orderId");
          localStorage.removeItem("shopping-card");
        } else {
          toast.error("پرداخت موفقیت‌آمیز نبود.");
        }

        // هدایت به صفحه اصلی
        setTimeout(() => {
          window.location.href = "https://kermanatari.ir/";
        }, 3000);
        
      } catch (error) {
        console.error("Payment check error:", error);
        toast.error("خطا در بررسی پرداخت.");
        window.location.href = "https://kermanatari.ir/";
      }
    };

    checkPayment();
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>در حال بررسی پرداخت...</h2>
    </div>
  );
};

export default PaymentCheck;
