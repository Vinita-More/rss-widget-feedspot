"use client";
import { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import css1 from "./searchbar.module.css";
import LogoutButton from "@/components/Logout/logout";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import useWidgetStore from "@/Store/widgetStore";

export default function Searchbar() {
  // Get state and actions from Zustand store
  const {
    isCollapsed,
    isMobileMenuOpen,
    token,
    userEmail,
    userInitial,
    setMobileMenuOpen,
    setToken,
    setUserData,
  } = useWidgetStore();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);

      try {
        const decoded = jwtDecode(storedToken);
        if (decoded?.email) {
          console.log("User email:", decoded.email);
          setUserData(decoded.email, decoded.email.charAt(0).toUpperCase());
        }
      } catch (err) {
        console.error("Invalid token:", err);
      }
    } else {
      router.push("/");
    }
  }, [setToken, setUserData, router]);

  return (
    <div
      className={`${css1.search} ${
        isCollapsed ? css1.collapsed : css1.expanded
      }`}
    >
      {/* Mobile Menu Button - only visible on mobile */}
      <button
        className={css1.mobileMenuBtn}
        onClick={handleMobileMenuToggle}
        aria-label="Toggle mobile menu"
      >
        <HiMenu className={css1.mobileHamburgerIcon} />
      </button>

      <input className={css1.searchinput} type="text" placeholder="Search" />

      {/* User Icon */}
      <div
        className={`${css1.userWrapper} ${isCollapsed ? css1.cs : ""}`}
        ref={dropdownRef}
      >
        <div className={css1.userCircle} onClick={toggleDropdown}>
          {userInitial}
        </div>

        {showDropdown && (
          <div className={css1.dropdownMenu}>
            <div className={css1.dropdownCol}>
              <div className={css1.dropdownItem}>🔍 Brand Monitoring</div>
              <div className={css1.dropdownItem}>📡 RSS Combiner</div>
            </div>
            <div className={css1.dropdownCol}>
              <div className={css1.dropdownItem}>💳 Billing</div>
              <div className={css1.dropdownItem}>⚙️ Account Settings</div>
              <div className={css1.dropdownItem}>
                <LogoutButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
