import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ShopingcardProvider } from "./components/context/ShopingCard.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ShopingcardProvider>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="65301995612-4np5jk542657v47pj3n0kgma1o0h2o4p.apps.googleusercontent.com">
          <App />
          <ToastContainer />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </ShopingcardProvider>
  </React.StrictMode>
);

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/sw.js", { scope: "/" })
//       .then((registration) => {
//         console.log(
//           "✅ Service Worker registered with scope:",
//           registration.scope
//         );
//       })
//       .catch((error) => {
//         console.error("❌ Service Worker registration failed:", error);
//       });
//   });
// }
