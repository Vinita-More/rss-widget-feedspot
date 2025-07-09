"use client";
import Link from "next/link";
import css1 from "./searchbar.module.css";

import LogoutButton from "@/components/Logout/logout";
export default function Searchbar() {
  return (
    <div className={css1.search}>
      <input className={css1.searchinput} type="text" placeholder="Search" />
      <LogoutButton />
      {/* <div>
        <div>{useremail}</div>
      </div> */}
    </div>
  );
}
