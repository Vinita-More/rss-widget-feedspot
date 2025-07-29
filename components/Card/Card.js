"use client";
import g from "./card.module.css";
import { useState, useEffect } from "react";
import ch from "./card-specific.module.css";
import useWidgetStore from "../../Store/widgetStore"; // Adjust path as needed

export default function Card({ onSave, onReset }) {
  // Get all necessary state and actions from Zustand store
  const {
    // State
    showBorder,
    borderColor,
    textAlign,
    fontStyle,
    autoscroll,
    cardHeight,
    cardWidth,
    selectedLayout,
    folderId,
    widgetName,
    editMode,
    formData,
    customFeedUrl,
    folderSelected,
    bgColor,
    sizeFont,
    textColor,
    isBold,
    mainTitle,
    titleBold,
    feedBgColor,
    showDesc,
    isTitle,
    descFont,
    postNumber,
    isCollapsed,

    // Actions
    setWidgetName,
    handleFormChange,
  } = useWidgetStore();

  // Local state for feeds and error (these are component-specific, not global)
  const [feeds, setFeed] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // Determine the feed URL to use
  const feedUrl = customFeedUrl;

  useEffect(() => {
    const fetchFeeds = async () => {
      setErrorMsg("");

      const useFeedUrl = feedUrl && feedUrl.trim() !== "" && !folderSelected;

      if (useFeedUrl) {
        try {
          const res = await fetch(
            "http://localhost:8080/RSS_Widget_Backend/api/index.php",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ feed_url: feedUrl }),
            }
          );
          const data = await res.json();

          if (data.error) {
            setErrorMsg(data.error);
            setFeed([]);
          } else {
            const unique = (data.items || data).filter(
              (feed, index, self) =>
                index ===
                self.findIndex(
                  (f) => f.title === feed.title && f.feedurl === feed.feedurl
                )
            );
            setFeed(unique);
          }
        } catch (error) {
          console.error("Custom feed fetch failed:", error);
          setErrorMsg("Network error while loading feed.");
          setFeed([]);
        }
      } else {
        const url =
          folderId > 0
            ? `http://localhost:8080/RSS_Widget_Backend/api/index.php?folder_id=${folderId}`
            : `http://localhost:8080/RSS_Widget_Backend/api/index.php`;

        try {
          const res = await fetch(url);
          const data = await res.json();
          setFeed(data);
        } catch (err) {
          console.error("Folder feed fetch failed:", err);
          setErrorMsg("Failed to load folder feeds.");
        }
      }
    };

    fetchFeeds();
  }, [feedUrl, folderId, folderSelected]);

  if (errorMsg) return <p style={{ color: "red" }}>{errorMsg}</p>;
  if (!feeds.length)
    return <p style={{ marginTop: "70px", marginLeft: "20px" }}>Loading...</p>;

  const uniqueFeeds = feeds.filter(
    (feed, index, self) =>
      index ===
      self.findIndex(
        (f) => f.title === feed.title && f.feedurl === feed.feedurl
      )
  );

  const formatDate = (dateStr, format) => {
    const date = new Date(dateStr);

    if (format === "dd-mm-yyyy") {
      return `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`;
    }

    // Default: Month DD, YYYY
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Limit posts based on postNumber setting
  const displayFeeds = uniqueFeeds.slice(0, postNumber || 3);

  return (
    <div className={g.parent}>
      <div className={g.h1}>
        <div>
          <div className={g.div1}>
            <input
              name="widgetName"
              type="text"
              placeholder="Enter Widget Name"
              className={g.searchInput}
              value={widgetName ?? ""}
              onChange={(e) => {
                setWidgetName(e.target.value);
                handleFormChange("widgetName", e.target.value);
              }}
            />
            <button
              className={g.savebutton}
              style={{ backgroundColor: "#f3d43c" }}
              onClick={onSave}
            >
              {editMode ? "Update" : "Save & Get Code"}
            </button>
            <button className={g.savebutton} onClick={onReset}>
              Reset
            </button>
          </div>

          <div
            className={`${g.cardcontainer} ${
              isCollapsed ? g.collapsed : g.expanded
            }`}
            style={{
              height: cardHeight ? `${parseInt(cardHeight)}px` : undefined,
              width: cardWidth ? `${parseInt(cardWidth)}px` : undefined,
              border: showBorder ? `1px solid ${borderColor}` : "none",
            }}
          >
            {/* Feed Title with customizable styling */}
            <p
              className={g.inp}
              style={{
                backgroundColor: bgColor !== "#ffffff" ? bgColor : "",
                fontSize: sizeFont ? `${sizeFont}px` : `16px`,
                color: textColor ? textColor : "#e2e2e2",
                fontWeight: isBold ? "bold" : "normal",
              }}
            >
              {formData.mainTitle || "RSS Feeds"}
            </p>

            <div
              className={g.insidecontainer}
              style={{
                overflowY: autoscroll === "true" ? "scroll" : "visible",
                scrollBehavior: "smooth",
                backgroundColor: formData.feedBgColor || undefined,
              }}
            >
              {displayFeeds.map((feed) => (
                <div
                  className={`${g.usercard} ${ch[selectedLayout] || ""}`}
                  key={feed.id || `${feed.title || "untitled"}-${feed.pubDate}`}
                  style={{ backgroundColor: formData.feedBgColor || undefined }}
                >
                  <a
                    href={feed.feedurl}
                    target="_blank"
                    style={{
                      fontFamily:
                        fontStyle !== "default" ? fontStyle : "sans-serif",
                      textAlign: textAlign ? textAlign : "left",
                      fontSize:
                        parseInt(cardHeight) < 150 || parseInt(cardWidth) < 150
                          ? "10px"
                          : undefined,
                    }}
                  >
                    {feed.image ? (
                      <img
                        src={
                          feed.image.startsWith("http")
                            ? feed.image
                            : `http://localhost:8080/RSS_Widget_Backend/${feed.image}`
                        }
                        alt={feed.title}
                        width={100}
                        style={{
                          display:
                            parseInt(cardHeight) < 150 ? "none" : undefined,
                        }}
                      />
                    ) : (
                      <p
                        style={{
                          textAlign: "center",
                          backgroundColor: "grey",
                          color: "white",
                        }}
                      >
                        image not present
                      </p>
                    )}
                    <div>
                      {(formData.isTitle === undefined ||
                        formData.isTitle === true ||
                        formData.isTitle === "true") && (
                        <h1
                          className={g.newlink}
                          style={{
                            textAlign: textAlign,
                            fontFamily:
                              fontStyle !== "default" ? fontStyle : "default",
                            fontSize:
                              formData.height && parseInt(formData.height) < 150
                                ? "10px"
                                : undefined,
                            fontWeight: formData.titleBold ? "bold" : "normal",
                          }}
                        >
                          {feed.title}
                        </h1>
                      )}

                      {(showDesc === undefined ||
                        showDesc === true ||
                        showDesc === "true") && (
                        <p
                          className={g.descriptionClamp}
                          style={{
                            textAlign: textAlign ? textAlign : "left",
                            fontFamily:
                              fontStyle !== "default"
                                ? fontStyle
                                : "sans-serif",
                            fontSize: formData.descFont
                              ? `${formData.descFont}px`
                              : parseInt(cardHeight) < 170 ||
                                parseInt(cardWidth) < 170
                              ? "10px"
                              : undefined,
                          }}
                        >
                          {feed.description}
                        </p>
                      )}
                    </div>
                    {feed.pubDate && (
                      <p
                        style={{
                          fontSize: "12px",
                          fontStyle: "italic",
                          color: "#666",
                          marginTop: "-8px",
                          textAlign: textAlign,
                        }}
                      >
                        {formatDate(
                          feed.pubDate,
                          formData?.dateFormat || "month-dd-yyyy"
                        )}
                      </p>
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
