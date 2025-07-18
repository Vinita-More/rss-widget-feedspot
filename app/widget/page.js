"use client";
import Search from "@/components/Feedurl/rss-feed-url";
import Sidebar from "@/components/Sidebar/Sidebar";
import Searchbar from "@/components/Searchbar/Searchbar";
import View from "@/components/View/view";
import Card from "@/components/Card/Card";
import General from "@/components/Editform/general";
import FeedspotSection from "@/components/Topbody/Topbody";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";
import Feedtitle from "@/components/Editform/feedtitle";

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
  const [customFeedUrl, setCustomFeedUrl] = useState(null);
  const [folderSelected, setFolderSelected] = useState(false);
  const [rssInputText, setRssInputText] = useState("");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [sizeFont, setSizeFont] = useState(16);
  const [textColor, setTextColor] = useState("#000000");
  const [isBold, setBold] = useState(false);
  const [mainTitle, setMainTitle] = useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [token, setToken] = useState(null);
  const [existingSettings, setExistingSettings] = useState({});

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
    textColor: "#000000",
    isBold: false,
    border: true,
    borderColor: "#000000",
    height: "300px",
    width: "100%",
    fontStyle: "normal",
    autoscroll: false,
    heightMode: "",
    widthMode: "",
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
    setBorderColor("#000000");
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
    setFormData({
      widthMode: "",
      width: "",
      heightMode: "posts",
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
    widthMode: "Responsive (Mobile friendly)",
    width: "",
    heightMode: "posts",
    height: "",
    autoscroll: "true",
    fontStyle: "default",
    border: "true",
    borderColor: "#000000",
    textAlign: "left",
    widgetName: "",
    folder_id: 0,
    bgColor: "#FFFFFF",
    sizeFont: 16,
    textColor: "#000000",
    isBold: false,
    mainTitle: "",
  });

  const handleFormChange = (name, value) => {
    if (name === "widgetName") setWidgetName(value);
    if (name === "height") setCardHeight(value);
    if (name === "width") setCardWidth(value);

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

    console.log("Payload being sent:", payload);
    // In your handleSubmit function, add this before the fetch:
    console.log("Current form state:", {
      widgetName,
      folderId,
      customFeedUrl,
      bgColor,
      sizeFont,
      mainTitle,
      textAlign,
      textColor,
      isBold,
      formData,
    });

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

  const handleFolderChange = (folderId) => {
    setFolderId(folderId); // set the folder ID
    setFolderSelected(true);
    setCustomFeedUrl(null); // mark that a folder has been explicitly selected
  };

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
    <div>
      <Sidebar />
      <Searchbar />
      <FeedspotSection />
      <Search
        onFolderChange={setFolderId}
        folderId={folderId}
        onFeedUrlChange={setCustomFeedUrl}
        rssInputText={rssInputText}
        setRssInputText={setRssInputText}
        setFolderId={setFolderId}
      />

      {/*setdisplayImg={setdisplayImg}*/}
      <View setSelectedLayout={setSelectedLayout} />
      <div>
        <Card
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
        />

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

        <Feedtitle
          setBgColor={setBgColor}
          setSizeFont={setSizeFont}
          setTextColor={setTextColor}
          formData={formData}
          handleFormChange={handleFormChange}
          setFormData={setFormData}
          setBold={setBold}
          setMainTitle={setMainTitle}
        />
      </div>
    </div>
  );
}
