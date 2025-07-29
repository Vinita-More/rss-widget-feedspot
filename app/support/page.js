"use client";
import Search from "@/components/Feedurl/rss-feed-url";
import View from "@/components/View/view";
import Card from "@/components/Card/Card";
import General from "@/components/Editform/general";
import FeedspotSection from "@/components/Topbody/Topbody";
import Feedtitle from "@/components/Editform/feedtitle";
import FeedContent from "@/components/Editform/feedcontent";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useWidgetStore from "@/Store/widgetStore";
import p from "./layout.module.css";
import FooterSection from "@/components/Footer/Footer";

export default function MainPage() {
  const {
    selectedLayout,
    folderId,
    showBorder,
    borderColor,
    textAlign,
    fontStyle,
    autoscroll,
    cardHeight,
    cardWidth,
    customFeedUrl,
    folderSelected,
    rssInputText,
    bgColor,
    sizeFont,
    textColor,
    isBold,
    mainTitle,
    postNumber,
    feedBgColor,
    isTitle,
    titleBold,
    showDesc,
    descFont,
    widgetName,
    editMode,
    editId,
    token,
    existingSettings,
    isMobileMenuOpen,
    isCollapsed,
    userEmail,
    userInitial,
    formData,
    setEditMode,
    setToken,
    resetAllSettings,
    handleFormChange,
    loadEditSettings,
    setMobileMenuOpen,
    setCollapsed,
    setWidgetName,
  } = useWidgetStore();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const rightCardRef = useRef(null);
  const scrollableLayoutRef = useRef(null);
  const [isRightSticky, setIsRightSticky] = useState(false);

  // Sticky logic
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollableLayoutRef.current || !rightCardRef.current) return;
      const layoutRect = scrollableLayoutRef.current.getBoundingClientRect();
      const shouldBeSticky = layoutRect.top <= 0;
      setIsRightSticky(shouldBeSticky);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Edit mode
  useEffect(() => {
    const edit = searchParams.get("edit") === "true";
    const id = searchParams.get("id");
    setEditMode(edit, id);
  }, [searchParams, pathname, setEditMode]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push("/");
    }
  }, [setToken, router]);

  useEffect(() => {
    if (editMode && editId && token) {
      fetch("http://localhost:8080/RSS_Widget_Backend/api/fetchonewidget.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: editId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            loadEditSettings(data);
          }
        })
        .catch((err) => console.error("Edit fetch error", err));
    }
  }, [editMode, editId, token, loadEditSettings]);

  const handleSubmit = async () => {
    if (!widgetName?.trim()) {
      alert("Please enter a widget name before saving.");
      return;
    }
    if (!token) {
      alert("User is not authenticated.");
      router.push("/");
      return;
    }
    const currentSettings = {
      bgColor,
      sizeFont,
      mainTitle,
      textAlign,
      textColor,
      isBold,
      fontStyle,
      border: showBorder,
      borderColor,
      autoscroll,
      widthMode: formData.widthMode,
      width: formData.width,
      heightMode: formData.heightMode,
      height: formData.height,
      folder_id: folderId,
      widgetName,
      showDesc: formData.showDesc,
      descFont: formData.descFont,
      feedBgColor: formData.feedBgColor,
      isTitle: formData.isTitle,
      postNumber: formData.postNumber,
      titleBold: formData.titleBold,
      ...formData,
    };
    const mergedSettings = editMode
      ? { ...existingSettings, ...currentSettings }
      : currentSettings;
    const apiUrl = editMode
      ? "http://localhost:8080/RSS_Widget_Backend/api/updatewidget.php"
      : "http://localhost:8080/RSS_Widget_Backend/api/save_settings.php";
    const payload = {
      widgetName,
      folder_id: folderId,
      feed_url: customFeedUrl,
      settings: JSON.stringify(mergedSettings),
      ...(editMode && { id: editId }),
    };
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      if (res.status === 401) {
        alert("Session expired or invalid token. Please log in again.");
        localStorage.removeItem("token");
        router.push("/");
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
      let result;
      try {
        result = JSON.parse(text);
      } catch (jsonErr) {
        const match = text.match(/({[\s\S]*})\s*$/);
        if (match) result = JSON.parse(match[1]);
        else throw new Error("Invalid JSON");
      }
      alert(result.error || (editMode ? "Widget updated!" : "Settings saved!"));
      if (editMode) router.replace("/widget");
      else resetAllSettings();
    } catch (err) {
      console.error("Fetch error:", err.message);
      alert("An error occurred while saving.");
    }
  };

  return (
    <div className={p.pageWrapper} style={{ width: "100%" }}>
      <div className={p.topSection}>
        <FeedspotSection isCollapsed={isCollapsed} />
      </div>
      <div className={p.scrollableLayout} ref={scrollableLayoutRef}>
        <div className={p.leftContent}>
          <Search isCollapsed={isCollapsed} />
          <View
            isCollapsed={isCollapsed}
            handleFormChange={handleFormChange}
            formData={formData}
          />
          <General
            isCollapsed={isCollapsed}
            formData={formData}
            handleFormChange={handleFormChange}
          />
          <Feedtitle
            isCollapsed={isCollapsed}
            formData={formData}
            handleFormChange={handleFormChange}
          />
          <FeedContent
            isCollapsed={isCollapsed}
            formData={formData}
            handleFormChange={handleFormChange}
          />
        </div>
        <div
          ref={rightCardRef}
          className={`rgt_box ${isRightSticky ? p.stickyCard : ""}`}
          style={{
            width: "45%",
            paddingLeft: "5px",
            paddingRight: "0px",
            top: isRightSticky ? 0 : "auto",
            zIndex: isRightSticky ? 1000 : "auto",
            backgroundColor: "white",
          }}
        >
          <div id="scrollToFixed">
            <Card onSave={handleSubmit} onReset={resetAllSettings} />
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
