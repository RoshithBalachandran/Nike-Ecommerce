import React, { useState, useEffect } from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
} from "react-icons/bs";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import "./Sidebar.css";

const SideBar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setIsOpen(true); // Always show on desktop
    }
  };

  const handleNavClick = (fn) => {
    fn(); // call the navigation function
    if (isMobile) setIsOpen(false); // auto-close on mobile
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="sidebar-toggle">
        {isOpen ? (
          <IoMdClose onClick={toggleSidebar} className="hamburger-icon" />
        ) : (
          <GiHamburgerMenu onClick={toggleSidebar} className="hamburger-icon" />
        )}
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      <aside id="sidebar" className={isOpen ? "open" : "closed"}>
        <div className="sidebar-title">
          <div className="sidebar-brand">
            <BsCart3 className="icon_header" /> <span>SHOP</span>
          </div>
        </div>

        <ul className="sidebarlist">
          <li className="sidebar-list-item" onClick={() => handleNavClick(onNavigate.dashboard)}>
            <BsGrid1X2Fill className="icon" /> <span>Dashboard</span>
          </li>
          <li className="sidebar-list-item" onClick={() => handleNavClick(onNavigate.products)}>
            <BsFillArchiveFill className="icon" /> <span>Products</span>
          </li>
          <li className="sidebar-list-item" onClick={() => handleNavClick(onNavigate.categories)}>
            <BsFillGrid3X3GapFill className="icon" /> <span>Categories</span>
          </li>
          <li className="sidebar-list-item" onClick={() => handleNavClick(onNavigate.Orders)}>
            <HiOutlineReceiptRefund className="icon" /> <span>Orders</span>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
