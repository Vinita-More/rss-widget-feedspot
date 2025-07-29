// Updated MainPage component with fixed sidebar offset calculation

"use client";
import Search from "@/components/Feedurl/rss-feed-url";
import Sidebar from "@/components/Sidebar/Sidebar";
import Searchbar from "@/components/Searchbar/Searchbar";
import View from "@/components/View/view";
import Card from "@/components/Card/Card";
import General from "@/components/Editform/general";
import FeedspotSection from "@/components/Topbody/Topbody";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";
import Feedtitle from "@/components/Editform/feedtitle";
import FeedContent from "@/components/Editform/feedcontent";
import p from "./prac.module.css";

export default function MainPage() {
  // ... all your existing state variables remain the same ...
  const [selectedLayout, setSelectedLayout] = useState("");
  const [folderId, setFolderId] = useState(0);
  const [showBorder, setShowBorder] = useState(true);
  const [borderColor, setBorderColor] = useState("#e2e2e2");
  const [textAlign, setTextAlign] = useState("left");
  const [fontStyle, setFontStyle] = useState("default");
  const [autoscroll, setAutoscroll] = useState("true");
  const [cardHeight, setCardHeight] = useState();
  const [cardWidth, setCardWidth] = useState();
  const [customFeedUrl, setCustomFeedUrl] = useState(null);
  const [folderSelected, setFolderSelected] = useState(false);
  const [rssInputText, setRssInputText] = useState("");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [sizeFont, setSizeFont] = useState(16);
  const [textColor, setTextColor] = useState("#e2e2e2");
  const [isBold, setBold] = useState(false);
  const [mainTitle, setMainTitle] = useState("");
  const [postNumber, setPostNumber] = useState(3);
  const [feedBgColor, setFeedBgColor] = useState("#FFFFFF");
  const [isTitle, setIsTitle] = useState(true);
  const [titleBold, setTitleBold] = useState(false);
  const [showDesc, setShowDesc] = useState(true);
  const [descFont, setDescFont] = useState(16);
  const [widgetName, setWidgetName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [token, setToken] = useState(null);
  const [existingSettings, setExistingSettings] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Add scroll state
  const [enableInternalScroll, setEnableInternalScroll] = useState(false);
  const triggerRef = useRef(null);
  const scrollableLayoutRef = useRef(null);
  const topSectionRef = useRef(null);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [topOffset, setTopOffset] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(0);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Calculate dynamic offsets
  useEffect(() => {
    if (topSectionRef.current) {
      const height = topSectionRef.current.offsetHeight;
      setTopOffset(height);
    }
  }, []);

  // Update sidebar width when collapsed state changes
  useEffect(() => {
    setSidebarWidth(isCollapsed ? 70 : 0);
  }, [isCollapsed]);

  // Enhanced Intersection Observer to detect when to enable internal scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldEnableScroll = !entry.isIntersecting;
        setEnableInternalScroll(shouldEnableScroll);

        // Store layout measurements when becoming sticky
        if (
          shouldEnableScroll &&
          scrollableLayoutRef.current &&
          layoutHeight === 0
        ) {
          setLayoutHeight(scrollableLayoutRef.current.offsetHeight);
        }
      },
      {
        threshold: 0,
        rootMargin: "-1px 0px 0px 0px",
      }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current);
      }
    };
  }, [layoutHeight]); // Removed isCollapsed from dependencies

  // Reset layout height when switching between sticky and normal mode
  useEffect(() => {
    if (!enableInternalScroll) {
      setLayoutHeight(0);
    }
  }, [enableInternalScroll]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSidebarToggle = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  // ... all your existing useEffect hooks and functions remain exactly the same ...

  useEffect(() => {
    const edit = searchParams.get("edit") === "true";
    const id = searchParams.get("id");
    setEditMode(edit);
    setEditId(id);
  }, [searchParams, pathname]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push("/");
    }
  }, []);

  const defaultSettings = {
    bgColor: "#FFFFFF",
    sizeFont: 16,
    mainTitle: "RSS Feeds",
    textAlign: "left",
    textColor: "#8a8989ff",
    isBold: false,
    border: true,
    borderColor: "#000000",
    height: "100px",
    width: "100%",
    fontStyle: "normal",
    autoscroll: false,
    heightMode: "",
    widthMode: "",
    showDesc: false,
    descFont: 12,
    feedBgColor: "#f0f0f0",
    isTitle: true,
    postNumber: 3,
    titleBold: false,
    selectedLayout: "",
  };

  const [formData, setFormData] = useState({
    widthMode: "Responsive (Mobile friendly)",
    width: "",
    heightMode: "posts",
    height: "",
    autoscroll: "true",
    fontStyle: "default",
    border: "true",
    borderColor: "#e2e2e2",
    textAlign: "left",
    widgetName: "",
    folder_id: 0,
    bgColor: "#FFFFFF",
    sizeFont: 16,
    textColor: "#e2e2e2",
    isBold: false,
    mainTitle: "",
    showDesc: true,
    descFont: 16,
    feedBgColor: "#FFFFFF",
    isTitle: true,
    postNumber: 3,
    titleBold: false,
    dateFormat: "month-dd-yyyy",
    rssInputText: "",
    selectedLayout: "",
  });

  const resetAllSettings = () => {
    setShowBorder(true);
    setBorderColor("#e2e2e2");
    setTextAlign("left");
    setFontStyle("default");
    setAutoscroll("true");
    setCardHeight("");
    setCardWidth("");
    setSelectedLayout("");
    setFolderId(0);
    setWidgetName("");
    setCustomFeedUrl(null);
    setRssInputText("");
    setBgColor("#FFFFFF");
    setSizeFont(16);
    setTextColor("#e2e2e2");
    setBold(false);
    setMainTitle("RSS Feeds");
    setTitleBold(false);
    setFeedBgColor("#FFFFFF");
    setShowDesc(true);
    setIsTitle(true);
    setDescFont(16);
    setPostNumber(3);
    setFormData({
      widthMode: "Responsive (Mobile friendly)",
      width: "",
      heightMode: "posts",
      height: "",
      autoscroll: "true",
      fontStyle: "default",
      border: "true",
      borderColor: "#e2e2e2",
      textAlign: "left",
      widgetName: "",
      folder_id: 0,
      bgColor: "#FFFFFF",
      sizeFont: 16,
      textColor: "#e2e2e2",
      isBold: false,
      mainTitle: "RSS Feeds",
      showDesc: true,
      descFont: 16,
      feedBgColor: "#FFFFFF",
      isTitle: true,
      postNumber: 3,
      titleBold: false,
      dateFormat: "month-dd-yyyy",
      selectedLayout: "",
    });
  };

  const handleFormChange = (name, value) => {
    if (name === "widgetName") setWidgetName(value);
    if (name === "height") setCardHeight(value);
    if (name === "width") setCardWidth(value);
    if (name === "feedUrl") setCustomFeedUrl(value);
    if (name === "selectedLayout") setSelectedLayout(value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, folder_id: folderId || 0 }));
  }, [folderId]);

  const handleSubmit = async () => {
    if (!widgetName || widgetName.trim() === "") {
      alert("Please enter a widget name before saving.");
      return;
    }
    if (!token) {
      alert("User is not authenticated.");
      router.push("/");
      return;
    }

    const currentSettings = {
      bgColor: bgColor,
      sizeFont: sizeFont,
      mainTitle: mainTitle,
      textAlign: textAlign,
      textColor: textColor,
      isBold: isBold,
      fontStyle: fontStyle,
      border: showBorder,
      borderColor: borderColor,
      autoscroll: autoscroll,
      widthMode: formData.widthMode,
      width: formData.width,
      heightMode: formData.heightMode,
      height: formData.height,
      folder_id: folderId,
      widgetName: widgetName,
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
      widgetName: widgetName,
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

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      let result;
      try {
        result = JSON.parse(text);
      } catch (jsonErr) {
        const jsonMatch = text.match(/({[\s\S]*})\s*$/);
        if (jsonMatch) {
          try {
            result = JSON.parse(jsonMatch[1]);
          } catch (jsonErr2) {
            alert("Server error: " + text);
            return;
          }
        } else {
          alert("Server error: " + text);
          return;
        }
      }

      if (result.error) {
        alert(result.error);
      } else {
        alert(
          editMode
            ? "Widget updated successfully!"
            : "Settings saved successfully!"
        );

        if (editMode) {
          router.replace("/widget");
        } else {
          resetAllSettings();
        }
      }
    } catch (err) {
      alert("An error occurred while saving. Please try again.");
    }
  };

  useEffect(() => {
    if (!customFeedUrl || customFeedUrl.trim() === "") {
      setFolderSelected(false);
    }
  }, [customFeedUrl]);

  const effectiveBorderColor =
    borderColor &&
    bgColor &&
    borderColor.toLowerCase() === bgColor.toLowerCase()
      ? "#000000"
      : borderColor;

  return (
    <>
      <div className={p.pageWrapper} style={{ width: "100%" }}>
        {/* Top section */}
        <div ref={topSectionRef} className={p.topSection}>
          <Sidebar
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            isMobileMenuOpen={isMobileMenuOpen}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
          <Searchbar
            onMobileMenuToggle={handleMobileMenuToggle}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            isCollapsed={isCollapsed}
          />
          <FeedspotSection isCollapsed={isCollapsed} />
        </div>

        {/* Invisible trigger element */}
        <div ref={triggerRef} style={{ height: "1px", width: "100%" }} />

        {/* Placeholder to maintain document flow when sticky */}
        {enableInternalScroll && (
          <div
            style={{
              height: `${layoutHeight}px`,
              width: "50%",
              marginLeft: isCollapsed ? "70px" : "225px",
            }}
          />
        )}

        {/* Main content area */}
        <div
          ref={scrollableLayoutRef}
          className={p.scrollableLayout}
          style={{
            ...(enableInternalScroll
              ? {
                  position: "fixed",
                  left: `${sidebarWidth}px`,
                  width: `calc(100vw - ${sidebarWidth}px)`,
                  height: "100vh",
                  background: "#ffffff",
                  overflow: "auto",
                }
              : {}),
          }}
        >
          <div
            className={`${p.leftContent} ${
              enableInternalScroll ? p.scrollEnabled : p.scrollDisabled
            }`}
            style={
              enableInternalScroll
                ? {
                    height: "100vh",
                    scrollBehavior: "smooth",
                  }
                : {}
            }
          >
            <Search
              isCollapsed={isCollapsed}
              onFolderChange={setFolderId}
              folderId={folderId}
              onFeedUrlChange={setCustomFeedUrl}
              rssInputText={rssInputText}
              setRssInputText={setRssInputText}
              setFolderId={setFolderId}
            />
            <View
              isCollapsed={isCollapsed}
              setSelectedLayout={setSelectedLayout}
              handleFormChange={handleFormChange}
              formData={formData}
            />
            <General
              isCollapsed={isCollapsed}
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
            <Feedtitle
              isCollapsed={isCollapsed}
              setBgColor={setBgColor}
              setSizeFont={setSizeFont}
              setTextColor={setTextColor}
              formData={formData}
              handleFormChange={handleFormChange}
              setBold={setBold}
              setMainTitle={setMainTitle}
            />
            <FeedContent
              isCollapsed={isCollapsed}
              setTitleBold={setTitleBold}
              setFeedBgColor={setFeedBgColor}
              setShowDesc={setShowDesc}
              setIsTitle={setIsTitle}
              setDescFont={setDescFont}
              setPostNumber={setPostNumber}
              formData={formData}
              handleFormChange={handleFormChange}
            />
          </div>

          <div className={p.rightStickyCard}>
            <Card
              isCollapsed={isCollapsed}
              showBorder={showBorder}
              borderColor={effectiveBorderColor}
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
              editMode={editMode}
              formData={formData}
              feedUrl={customFeedUrl}
              folderSelected={folderSelected}
              bgColor={bgColor}
              sizeFont={sizeFont}
              textColor={textColor}
              isBold={isBold}
              mainTitle={mainTitle}
              titleBold={titleBold}
              feedBgColor={feedBgColor}
              showDesc={showDesc}
              isTitle={isTitle}
              descFont={descFont}
              postNumber={postNumber}
            />
          </div>
        </div>
        {!enableInternalScroll && (
          <div
            style={{
              marginLeft: isCollapsed ? "70px" : "225px",
              padding: "1.5rem",
              backgroundColor: "#f7f7f7",
              marginTop: "200vh",
            }}
          >
            <h2 style={{ marginBottom: "1rem" }}>New Section</h2>
            <p>
              This section appears below the sticky layout when not in sticky
              mode.hi
            </p>
            {/* Add your new content here */}
          </div>
        )}
      </div>
    </>
  );
}
