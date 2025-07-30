"use client";
import Search from "@/components/Feedurl/rss-feed-url";
import View from "@/components/View/view";
import Card from "@/components/Card/Card";
import General from "@/components/Editform/general";
import FeedspotSection from "@/components/Topbody/Topbody";
import Feedtitle from "@/components/Editform/feedtitle";
import FeedContent from "@/components/Editform/feedcontent";
import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useWidgetStore from "@/Store/widgetStore";
import p from "./page.module.css";
import FooterSection from "@/components/Footer/Footer";

export default function MainPage() {
  // Get all needed state and actions from Zustand store
  const {
    // States
    folderId,
    showBorder,
    borderColor,
    textAlign,
    fontStyle,
    autoscroll,
    customFeedUrl,
    bgColor,
    sizeFont,
    textColor,
    isBold,
    mainTitle,
    /*postNumber,selectedLayout,
    folderSelected,
    rssInputText,
    feedBgColor, cardHeight,
    cardWidth,
    isTitle,
    titleBold,
    showDesc,
    descFont,
     isMobileMenuOpen,
   */
    widgetName,
    editMode,
    editId,
    token,
    existingSettings,
    isCollapsed,
    formData,

    // Actions
    setEditMode,
    setToken,
    resetAllSettings,
    handleFormChange,
    loadEditSettings,
    /*setMobileMenuOpen,
    setCollapsed,
    setWidgetName,*/
  } = useWidgetStore();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  {
    /*
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSidebarToggle = (collapsed) => {
    setCollapsed(collapsed);
  };
 */
  }
  // Check if edit mode is active
  useEffect(() => {
    const edit = searchParams.get("edit") === "true";
    const id = searchParams.get("id");
    setEditMode(edit, id);
  }, [searchParams, pathname, setEditMode]);

  // Check if user has a valid token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push("/");
    }
  }, [setToken, router]);

  // Fetch data if edit is requested
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

  // Handle data submission
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

    // Merge with existing settings for edit mode
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
          router.replace("/widget");
        } else {
          resetAllSettings();
        }
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
      alert("An error occurred while saving. Please try again.");
    }
  };

  // Prevent invisible border: if borderColor matches bgColor, use black
  const effectiveBorderColor =
    borderColor &&
    bgColor &&
    borderColor.toLowerCase() === bgColor.toLowerCase()
      ? "#000000"
      : borderColor;

  return (
    <div className={p.pageWrapper}>
      {/* Top section */}
      <FeedspotSection isCollapsed={isCollapsed} />

      {/* Main content with two-column layout */}
      <div className={p.mainWrapper}>
        <div className={p.leftColumn}>
          <Search isCollapsed={isCollapsed} />
          <View
            isCollapsed={isCollapsed}
            setSelectedLayout={(layout) =>
              handleFormChange("selectedLayout", layout)
            }
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

        <div className={p.rightColumn}>
          <Card onSave={handleSubmit} onReset={resetAllSettings} />
        </div>
      </div>

      {/* Footer at the bottom */}
      <FooterSection style={{ marginTop: "5vh" }} />
    </div>
  );
}
