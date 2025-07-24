"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  HiHome,
  HiTemplate,
  HiCog,
  HiViewGrid,
  HiQuestionMarkCircle,
  HiLightBulb,
  HiUsers,
  HiMenu,
} from "react-icons/hi";
import classes from "./sidebar.module.css";

export default function Sidebar({
  isMobileMenuOpen,
  onMobileMenuToggle,
  onSidebarToggle,
  isCollapsed,
  setIsCollapsed,
}) {
  // const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);

    // Notify parent component about the sidebar state change
    if (onSidebarToggle) {
      onSidebarToggle(newCollapsedState);
    }
  };

  // Notify parent about initial state
  useEffect(() => {
    if (onSidebarToggle) {
      onSidebarToggle(isCollapsed);
    }
  }, []);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`${classes.new} ${isCollapsed ? classes.collapsed : ""} ${
          isMobileMenuOpen ? classes.mobileOpen : ""
        }`}
      >
        {/* Header with Title and Toggle - only visible on desktop */}
        <div className={classes.header}>
          {!isCollapsed && <p className={classes.main}>FeedSpot</p>}
          <button
            className={classes.toggleBtn}
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <HiMenu className={classes.hamburgerIcon} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={classes.nav}>
          <div className={classes.words}>
            <Link
              href="/widget"
              className={classes.link}
              onClick={() => onMobileMenuToggle && onMobileMenuToggle()}
            >
              <HiHome className={classes.icon} />
              {!isCollapsed && (
                <span className={classes.linkText}>Feedspot Home</span>
              )}
            </Link>
          </div>

          <div className={classes.words}>
            <Link
              href="/widget"
              className={classes.link}
              onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
            >
              <HiTemplate className={classes.icon} />
              {!isCollapsed && (
                <span className={classes.linkText}>Widget Home</span>
              )}
            </Link>
          </div>

          <div className={classes.words}>
            <Link
              href="/mywidgets"
              className={classes.link}
              onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
            >
              <HiCog className={classes.icon} />
              {!isCollapsed && (
                <span className={classes.linkText}>My Widget</span>
              )}
            </Link>
          </div>

          <div className={classes.words}>
            <Link
              href="/widget-catalog"
              className={classes.link}
              onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
            >
              <HiViewGrid className={classes.icon} />
              {!isCollapsed && (
                <span className={classes.linkText}>Widget Catalog</span>
              )}
            </Link>
          </div>

          <div className={classes.words}>
            <Link
              href="/support"
              className={classes.link}
              onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
            >
              <HiQuestionMarkCircle className={classes.icon} />
              {!isCollapsed && (
                <span className={classes.linkText}>Support</span>
              )}
            </Link>
          </div>

          <div className={classes.words}>
            <Link
              href="/widget-examples"
              className={classes.link}
              onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
            >
              <HiLightBulb className={classes.icon} />
              {!isCollapsed && (
                <span className={classes.linkText}>Widget Examples</span>
              )}
            </Link>
          </div>

          <div className={classes.words}>
            <Link
              href="/prac"
              className={classes.link}
              onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
            >
              <HiUsers className={classes.icon} />
              {!isCollapsed && (
                <span className={classes.linkText}>Customers</span>
              )}
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className={classes.mobileOverlay}
          onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
