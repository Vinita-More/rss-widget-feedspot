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

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   setToken(storedToken);
  // }, []);

  useEffect(() => {
    const edit = searchParams.get("edit") === "true";
    const id = searchParams.get("id");

    setEditMode(edit);
    setEditId(id);
  }, [searchParams, pathname]);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push("/"); // redirect to login only if token missing
    }
  }, []);

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
          // populate form
          if (data) {
            setWidgetName(data.widget_name);
            setCardHeight(parseInt(data.height));
            setCardWidth(parseInt(data.width));
            setFolderId(parseInt(data.folder_id));
            setFormData({
              widthMode: data.width_mode,
              width: data.width,
              heightMode: data.height_mode,
              height: data.height,
              autoscroll: data.autoscroll,
              fontStyle: data.font_style,
              border: data.border,
              borderColor: data.border_color,
              textAlign: data.text_alignment,
              widgetName: data.widget_name,
              folder_id: parseInt(data.folder_id),
            });
          }
          if (data.feed_url) {
            setCustomFeedUrl(data.feed_url);
            setRssInputText(data.feed_url);
            setFolderId(-1);
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

  const handleSubmit = async () => {
    if (!widgetName || widgetName.trim() === "") {
      alert("Please enter a widget name before saving.");
      return;
    }
    if (!token) {
      alert("User is not authenticated.");
      router.push("/"); // redirect to login
      return;
    }
    const apiUrl = editMode
      ? "http://localhost:8080/RSS_Widget_Backend/api/updatewidget.php"
      : "http://localhost:8080/RSS_Widget_Backend/api/save_settings.php";

    //const userEmail = localStorage.getItem("userEmail");
    const payload = editMode
      ? { ...formData, id: editId, feed_url: customFeedUrl }
      : { ...formData, feed_url: customFeedUrl };

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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

      if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
      const result = JSON.parse(text);

      if (result.error) {
        alert(result.error);
      } else {
        alert(editMode ? "Widget updated" : "Settings saved");
        // resetAllSettings();

        if (editMode) {
          router.replace("/widget"); // clears ?edit=true&id=...
        }
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
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
          editMode={editMode}
          formData={formData}
          feedUrl={customFeedUrl}
          folderSelected={folderSelected}
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
      </div>
    </div>
  );
}

// const handleSubmit = async () => {
//   if (!widgetName || widgetName.trim() === "") {
//     alert("Please enter a widget name before saving.");
//     return;
//   }

//   try {
//     const res = await fetch(
//       "http://localhost:8080/RSS_Widget_Backend/api/save_settings.php",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//         //widgetName: widgetName,
//       }
//     );

//     const text = await res.text();
//     console.log("Raw response:", text);

//     if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
//     const result = JSON.parse(text);
//     if (result.error) {
//       alert(result.error); // ✅ shows "Widget name already exists"
//       return;
//     }

//     alert(result.message || "Settings saved");
//   } catch (err) {
//     console.error("Fetch error:", err.message);
//   }
// };
/*For editing and updating the settings,  this sends the values of a particular widget from the database to the form*/
// useEffect(() => {
//   if (editMode && editId && token) {
//     fetch("http://localhost:8080/RSS_Widget_Backend/api/fetchonewidget.php", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ id: editId }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data) {
//           setWidgetName(data.widget_name);
//           setCardHeight(parseInt(data.height));
//           setCardWidth(parseInt(data.width));
//           setFolderId(parseInt(data.folder_id));
//           setFormData({
//             widthMode: data.width_mode,
//             width: data.width,
//             heightMode: data.height_mode,
//             height: data.height,
//             autoscroll: data.autoscroll,
//             fontStyle: data.font_style,
//             border: data.border,
//             borderColor: data.border_color,
//             textAlign: data.text_alignment,
//             widgetName: data.widget_name,
//             folder_id: parseInt(data.folder_id) || 0,
//           });
//         }
//       })
//       .catch((err) => console.error("Edit fetch error", err));
//   }
// }, [editMode, editId, token]);
