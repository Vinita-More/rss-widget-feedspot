"use client";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";
import css1 from "./searchbar.module.css";
import LogoutButton from "@/components/Logout/logout";

export default function Searchbar({
  onMobileMenuToggle,
  isMobileMenuOpen,
  isCollapsed,
}) {
  return (
    <div
      className={`${css1.search} ${
        isCollapsed ? css1.collapsed : css1.expanded
      }`}
    >
      {/* Mobile Menu Button - only visible on mobile */}
      <button
        className={css1.mobileMenuBtn}
        onClick={onMobileMenuToggle}
        aria-label="Toggle mobile menu"
      >
        <HiMenu className={css1.mobileHamburgerIcon} />
      </button>

      <input className={css1.searchinput} type="text" placeholder="Search" />
      <LogoutButton />
    </div>
  );
}
