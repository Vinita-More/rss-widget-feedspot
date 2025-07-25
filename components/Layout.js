"use client";
import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Searchbar from "./Searchbar/Searchbar";
import FooterSection from "./Footer/Footer";

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSidebarToggle = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  return (
    <>
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={handleMobileMenuToggle}
        onSidebarToggle={handleSidebarToggle}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <Searchbar
        onMobileMenuToggle={handleMobileMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
        isCollapsed={isCollapsed}
        userInitial="W"
        userEmail="user@example.com"
      />

      <main style={{ paddingTop: "80px" }}>{children}</main>
    </>
  );
};

export default Layout;
