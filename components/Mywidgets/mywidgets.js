"use client";
import Searchbar from "../Searchbar/Searchbar";
import Sidebar from "../Sidebar/Sidebar";
import WidgetData from "./widgetdata";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import w from "./mywidgets.module.css";

export default function Currentwidget() {
  const router = useRouter();
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/"); // Redirect to login if not logged in
    }
  }, []);
  return (
    <div>
      <Searchbar />
      <Sidebar />
      <WidgetData />
    </div>
  );
}
