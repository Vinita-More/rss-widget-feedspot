"use client";
import Search from "@/components/Feedurl/rss-feed-url";
import Sidebar from "@/components/Sidebar/Sidebar";
import Searchbar from "@/components/Searchbar/Searchbar";
import View from "@/components/View/view";
import Card from "@/components/Card/Card";
import General from "@/components/Editform/general";
import FeedspotSection from "@/components/Topbody/Topbody";
import { useState } from "react";
export default function MainPage() {
  const [showBorder, setShowBorder] = useState(true);
  const [borderColor, setBorderColor] = useState("#000000");
  const [displayImg, setdisplayImg] = useState(true);
  return (
    <div>
      <Sidebar />
      {/* */}

      <Searchbar />
      {/* */}
      <FeedspotSection />
      {/*  */}
      <Search />
      {/* */}
      <View setdisplayImg={setdisplayImg} />
      {/* */}
      <Card
        showBorder={showBorder}
        borderColor={borderColor}
        displayImg={displayImg}
        // displayImg={displayImg}
      />
      {/* */}
      <General
        setShowBorder={setShowBorder}
        setBorderColor={setBorderColor}
        // setdisplayImg={setdisplayImg}
      />
      {/*  <Sidediv />
       */}
    </div>
  );
}
