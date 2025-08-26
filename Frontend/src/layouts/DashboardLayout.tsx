import React, { ReactNode } from "react";
import Sidebar from "../components/dashboard/Sidebar";
interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex ">
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;
