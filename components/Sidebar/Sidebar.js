"use client";
import Link from "next/link";
import { useEffect } from "react";
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
import useWidgetStore from "@/Store/widgetStore";

export default function Sidebar() {
  // Get state and actions from Zustand store
  const { isMobileMenuOpen, isCollapsed, setMobileMenuOpen, setCollapsed } =
    useWidgetStore();

  const toggleSidebar = () => {
    setCollapsed(!isCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

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
              onClick={() => setMobileMenuOpen(false)}
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
              onClick={() => setMobileMenuOpen(false)}
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
              onClick={() => setMobileMenuOpen(false)}
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
              onClick={() => setMobileMenuOpen(false)}
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
              onClick={() => setMobileMenuOpen(false)}
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
              onClick={() => setMobileMenuOpen(false)}
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
              onClick={() => setMobileMenuOpen(false)}
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
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
