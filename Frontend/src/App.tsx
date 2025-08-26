import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/home/Home";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AddCustomerOrder from "./components/dashboard/pages/AddCustomerOrder";
import Tags from "./components/dashboard/pages/Tags";
import ShopingCardPage from "./components/shopping card/ShopingCardPage";
import CommentManneger from "./components/dashboard/pages/CommentManneger";
import Ckeditor from "./components/utils/editor/Ckeditor";
import ProductPage from "./components/pages/Products/product/ProductPage";
import AllProducts from "./components/pages/Products/product/AllProducts";
import AccountGame from "./components/pages/Products/AccountGame";
import AllAcountGames from "./components/pages/Products/AllAcountGames";
import ShopingInfo from "./components/shopping card/ShopingInfo";
import Orders from "./components/dashboard/pages/orderTable/Orders";
import ProductsManneger from "./components/dashboard/pages/productManneger/ProductsManneger";
import Users from "./components/dashboard/pages/Users";
import Gallery from "./components/dashboard/pages/gallery/Gallery";
import Pishkhan from "./components/dashboard/pages/user/Pishkhan";
import EditeUserInfo from "./components/dashboard/pages/user/EditeUserInfo";
import UserOrders from "./components/dashboard/pages/user/UserOrders";
import Page404 from "./components/utils/validate/Page404";
import ProtectedRoute from "./components/utils/validate/ProtectedRoutes";
import Blogs from "./components/pages/blog/Blogs";
import Blog from "./components/pages/blog/Blog";
import UserFavorites from "./components/dashboard/pages/user/UserFavorites";
import PaymentCheck from "./components/utils/PaymentCheck";
import GameListPage from "./components/dashboard/pages/gameList/GameListPage";
import AllCustomerOrders from "./components/dashboard/Add Console/AllCustomerOrders";
import AboutUs from "./components/pages/abotus/AboutUs";
import ContactUs from "./components/pages/contactus/ContactUs";

const App: React.FC = () => {
  return (
    <div className="">
      <Routes>
        {/* Routes that use MainLayout */}
        <Route
          path="/404"
          element={
            <MainLayout>
              <Page404 />
            </MainLayout>
          }
        />
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
          <Route
          path="/about-us"
          element={
            <MainLayout>
              <AboutUs />
            </MainLayout>
          }
        />
           <Route
          path="/contact-us"
          element={
            <MainLayout>
              <ContactUs />
            </MainLayout>
          }
        />
        <Route
          path="/games/:category"
          element={
            <MainLayout>
              <AllAcountGames />
            </MainLayout>
          }
        />
        <Route
          path="/accountgame/:gameId"
          element={
            <MainLayout>
              <AccountGame />
            </MainLayout>
          }
        />
        <Route
          path="/checkout/cart"
          element={
            <MainLayout>
              <ShopingCardPage />
            </MainLayout>
          }
        />
        <Route
          path="/checkout/cart/info"
          element={
            <MainLayout>
              <ShopingInfo />
            </MainLayout>
          }
        />
        {/* *BLOG */}
        <Route
          path="/blogs"
          element={
            <MainLayout>
              <Blogs />
            </MainLayout>
          }
        />
         <Route
          path="/blog/:blogId"
          element={
            <MainLayout>
              <Blog />
            </MainLayout>
          }
        />
        {/* PRODUCT & PRODUCTS RPUTES */}
        {/* sssss */}
        <Route
          path="/products/:slug1"
          element={
            <MainLayout>
              <AllProducts />
            </MainLayout>
          }
        />
        <Route
          path="/products/:slug1/:slug2"
          element={
            <MainLayout>
              <AllProducts />
            </MainLayout>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <MainLayout>
              <ProductPage />
            </MainLayout>
          }
        />
         <Route
          path="/payment-callback"
          element={
            <MainLayout>
              <PaymentCheck />
            </MainLayout>
          }
        />
        {/* Route that doesn't use MainLayout */}
        <Route
          path="/dashboard/:userId"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddCustomerOrder />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-manneger/:userId"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/product-management/:userId"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProductsManneger />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/gallery/:userId"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Gallery />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/tags/:userId"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Tags />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/comment-manegment/:userId"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CommentManneger />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/weblog/:userId"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Ckeditor />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/orders/:userId"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Orders />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        {/* UsSER */}
        <Route
          path="/dashboard/userInfo/:userId"
          element={
            <DashboardLayout>
              <Pishkhan />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/editeUserInfo/:userId"
          element={
            <DashboardLayout>
              <EditeUserInfo />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/userOrders/:userId"
          element={
            <DashboardLayout>
              <UserOrders />
            </DashboardLayout>
          }
        />
         <Route
          path="/dashboard/game-list/:userId"
          element={
            <DashboardLayout>
              <GameListPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/userfavorites/:userId"
          element={
            <DashboardLayout>
              <UserFavorites />
            </DashboardLayout>
          }
        />
         <Route
          path="/dashboard/game-list"
          element={
            <DashboardLayout>
              <GameListPage />
            </DashboardLayout>
          }
        />
           <Route
          path="/dashboard/all-customer-orders/table"
          element={
            <DashboardLayout>
              <AllCustomerOrders />
            </DashboardLayout>
          }
        />
          <Route
          path="*"
          element={
            <MainLayout>
              <Page404 />
            </MainLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
