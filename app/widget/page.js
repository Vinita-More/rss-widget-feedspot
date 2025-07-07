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
  const [textAlign, setTextAlign] = useState("left");
  const [fontStyle, setFontStyle] = useState("default");
  const [autoscroll, setAutoscroll] = useState("true");
  const [cardHeight, setCardHeight] = useState();
  const [cardWidth, setCardWidth] = useState();
  const [selectedLayout, setSelectedLayout] = useState("");
  const [folderId, setFolderId] = useState(0);
  const [widgetName, setWidgetName] = useState("");

  /*as data that will  be passed on reset*/
  const resetAllSettings = () => {
    setShowBorder(true);
    setBorderColor("#000000");
    setTextAlign("left");
    setFontStyle("default");
    setAutoscroll("true");
    setCardHeight("250");
    setCardWidth("");
    setSelectedLayout("");
    setFolderId(0);
    setWidgetName("");
    setFormData({
      widthMode: "",
      width: "",
      heightMode: "",
      height: "",
      autoscroll: "true",
      fontStyle: "default",
      border: "true",
      borderColor: "#000000",
      textAlign: "left",
      widgetName: "",
    });
  };

  const [formData, setFormData] = useState({
    widthMode: "",
    width: "",
    heightMode: "",
    height: "",
    autoscroll: "",
    fontStyle: "default",
    border: "true",
    borderColor: "#000000",
    textAlign: "",
    widgetName: widgetName,
  });

  const handleFormChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/RSS_Widget_Backend/api/save_settings.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          widgetName: widgetName,
        }
      );

      const text = await res.text();
      console.log("Raw response:", text);

      if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
      const result = JSON.parse(text);
      alert(result.message || "Settings saved");
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  };

  return (
    <div>
      <Sidebar />

      <Searchbar />

      <FeedspotSection />

      <Search onFolderChange={setFolderId} />

      {/*setdisplayImg={setdisplayImg}*/}
      <View setSelectedLayout={setSelectedLayout} />

      <Card
        showBorder={showBorder}
        borderColor={borderColor}
        textAlign={textAlign}
        fontStyle={fontStyle}
        autoscroll={autoscroll}
        cardHeight={cardHeight}
        cardWidth={cardWidth}
        selectedLayout={selectedLayout}
        folderId={folderId}
        onSave={handleSubmit}
        widgetName={widgetName}
        setWidgetName={setWidgetName}
        handleFormChange={handleFormChange}
        onReset={resetAllSettings}
      />
      {/* */}
      <General
        setShowBorder={setShowBorder}
        setBorderColor={setBorderColor}
        setTextAlign={setTextAlign}
        setFontStyle={setFontStyle}
        setAutoscroll={setAutoscroll}
        setCardHeight={setCardHeight}
        setCardWidth={setCardWidth}
        formData={formData}
        handleFormChange={handleFormChange}
      />

      {/*  <Sidediv />
       */}
    </div>
  );
}
