import React, { ReactNode } from "react";
import HeaderContainer from "../components/header/HeaderContainer";
import Footer from "../components/footer/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <HeaderContainer />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
