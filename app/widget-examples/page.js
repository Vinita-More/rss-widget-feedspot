"use client";
import Search from "@/components/Feedurl/rss-feed-url";
import Sidebar from "@/components/Sidebar/Sidebar";
import Searchbar from "@/components/Searchbar/Searchbar";
import View from "@/components/View/view";
import Card from "@/components/Card/Card";
import General from "@/components/Editform/general";
import FeedspotSection from "@/components/Topbody/Topbody";
import { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";
import Feedtitle from "@/components/Editform/feedtitle";
import FeedContent from "@/components/Editform/feedcontent";
import p from "./layout.module.css";
import { jwtDecode } from "jwt-decode";

export default function MainPage() {
  const [selectedLayout, setSelectedLayout] = useState("");
  const [folderId, setFolderId] = useState(0);

  // States of general customization
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

  // State for feed title sutomization
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [sizeFont, setSizeFont] = useState(16);
  const [textColor, setTextColor] = useState("#e2e2e2");
  const [isBold, setBold] = useState(false);
  const [mainTitle, setMainTitle] = useState("");

  // States for Feed content customization
  const [postNumber, setPostNumber] = useState(3);
  const [feedBgColor, setFeedBgColor] = useState("#FFFFFF");
  const [isTitle, setIsTitle] = useState(true);
  const [titleBold, setTitleBold] = useState(false);
  const [showDesc, setShowDesc] = useState(true);
  const [descFont, setDescFont] = useState(14);

  // State for card widget name
  const [widgetName, setWidgetName] = useState("");

  // States for edit mode checking
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // State to check token
  const [token, setToken] = useState(null);
  const [existingSettings, setExistingSettings] = useState({});

  // State to check for mobile screen, to apply mobile responsiveness
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userInitial, setUserInitial] = useState("");
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handler for sidebar collapse state
  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  /*For checking if edit mode is active*/
  useEffect(() => {
    const edit = searchParams.get("edit") === "true";
    const id = searchParams.get("id");
    setEditMode(edit);
    setEditId(id);
  }, [searchParams, pathname]);

  const router = useRouter();

  /*To check if user has a valid token */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push("/"); // redirect to login only if token missing
    }
  }, []);

  /*Default values*/
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
    descFont: 14,
    feedBgColor: "#f0f0f0",
    isTitle: true,
    postNumber: 3,
    titleBold: false,
    selectedLayout: "",
  };

  /*To fetch data if edit is requested. */
  // In your page.js, replace the useEffect for fetching edit data with this:

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
            // Parse set_data JSON
            let parsedSettings = {};
            try {
              parsedSettings = data.set_data ? JSON.parse(data.set_data) : {};
            } catch (err) {
              console.error("Invalid JSON in set_data:", err);
            }

            // Create merged settings object
            const mergedSettings = {
              ...defaultSettings,
              // Database columns
              widthMode: data.width_mode ?? defaultSettings.widthMode,
              width: data.width ?? defaultSettings.width,
              heightMode: data.height_mode ?? defaultSettings.heightMode,
              height: data.height ?? defaultSettings.height,
              autoscroll:
                data.autoscroll === "true" || data.autoscroll === true,
              fontStyle: data.font_style ?? defaultSettings.fontStyle,
              border: data.border === "true" || data.border === true,
              borderColor: data.border_color ?? defaultSettings.borderColor,
              textAlign: data.text_alignment ?? defaultSettings.textAlign,
              widgetName: data.widget_name ?? "",
              folder_id: parseInt(data.folder_id) || 0,
              // JSON settings (override DB columns where applicable)
              ...parsedSettings,
            };

            console.log("Merged settings:", mergedSettings); // Debug log

            // Set the complete form data
            setFormData(mergedSettings);

            // Set existing settings for comparison
            setExistingSettings(mergedSettings);

            // Set individual component states
            setWidgetName(data.widget_name);
            setCardHeight(mergedSettings.height);
            setCardWidth(mergedSettings.width);
            setFolderId(mergedSettings.folder_id);
            setMainTitle(mergedSettings.mainTitle);
            setSizeFont(mergedSettings.sizeFont);
            setBold(mergedSettings.isBold);
            setTextColor(mergedSettings.textColor);
            setBgColor(mergedSettings.bgColor);
            setFontStyle(mergedSettings.fontStyle);
            setTextAlign(mergedSettings.textAlign);
            setBorderColor(mergedSettings.borderColor);
            setShowBorder(mergedSettings.border);
            setAutoscroll(mergedSettings.autoscroll.toString());

            // Handle custom feed URL
            if (data.feed_url) {
              setCustomFeedUrl(data.feed_url);
              setRssInputText(data.feed_url);
              setFolderId(-1);
            }
          }
        })
        .catch((err) => console.error("Edit fetch error", err));
    }
  }, [editMode, editId, token]);

  /*for resetting the form inputs*/
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

    // Title customization
    setBgColor("#FFFFFF");
    setSizeFont(16);
    setTextColor("#e2e2e2");
    setBold(false);
    setMainTitle("RSS Feeds");

    // Content customization
    setTitleBold(false);
    setFeedBgColor("#FFFFFF");
    setShowDesc(true);
    setIsTitle(true);
    setDescFont(14);
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
      mainTitle: "",
      showDesc: true,
      descFont: 14,
      feedBgColor: "#FFFFFF",
      isTitle: true,
      postNumber: 3,
      titleBold: false,
      dateFormat: "month-dd-yyyy",

      selectedLayout: "",
    });
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
    descFont: 14,
    feedBgColor: "#FFFFFF",
    isTitle: true,
    postNumber: 3,
    titleBold: false,
    dateFormat: "month-dd-yyyy",
    rssInputText: "",
    selectedLayout: "",
  });

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

  /*Handles data submission*/
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

    // Create the current settings object
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

    // Merge with existing settings for edit mode
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
      console.log("Raw response:", text);

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
        // Try to extract JSON from the end of the response
        const jsonMatch = text.match(/({[\s\S]*})\s*$/);
        if (jsonMatch) {
          try {
            result = JSON.parse(jsonMatch[1]);
          } catch (jsonErr2) {
            alert("Server error: " + text);
            console.error("Non-JSON response from server:", text);
            return;
          }
        } else {
          alert("Server error: " + text);
          console.error("Non-JSON response from server:", text);
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
          router.replace("/widget"); // Navigate back to widget list
        } else {
          resetAllSettings(); // Reset form for new widget
        }
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
      alert("An error occurred while saving. Please try again.");
    }
  };

  // const handleFolderChange = (folderId) => {
  //   setFolderId(folderId); // set the folder ID
  //   setFolderSelected(true);
  //   setCustomFeedUrl(null); // mark that a folder has been explicitly selected
  // };

  useEffect(() => {
    if (!customFeedUrl || customFeedUrl.trim() === "") {
      setFolderSelected(false);
    }
  }, [customFeedUrl]);

  // Prevent invisible border: if borderColor matches bgColor, use black
  const effectiveBorderColor =
    borderColor &&
    bgColor &&
    borderColor.toLowerCase() === bgColor.toLowerCase()
      ? "#000000"
      : borderColor;
  return (
    <div className={p.pageWrapper} style={{ width: "100%" }}>
      {/* Top section scrolls normally */}
      <div className={p.topSection}>
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
          userEmail={userEmail}
          userInitial={userInitial}
        />
        <FeedspotSection isCollapsed={isCollapsed} />
      </div>

      {/* Everything from FeedUrl downward scrolls left, card stays sticky */}
      <div className={p.scrollableLayout}>
        <div className={p.leftContent}>
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
      <div className={p.belowBothColumns}>
        <h2>This is below left & right layout</h2>
      </div>
    </div>
  );
}
