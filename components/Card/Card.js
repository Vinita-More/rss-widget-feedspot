"use client";
import Link from "next/link";
import g from "./card.module.css";
import { useState, useEffect } from "react";

export default function Card({
  showBorder,
  borderColor,
  textAlign,
  fontStyle,
  autoscroll,
  cardHeight,
  cardWidth,
  selectedLayout,
  folderId,
  onSave,
  widgetName,
  setWidgetName,
  handleFormChange,
  onReset,
  editMode,
  formData,
  feedUrl,
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
}) {
  const [feeds, setFeed] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

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
  if (!feeds.length) return <p>Loading...</p>;

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
            <div className={g.buttonGroup}>
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
          </div>

          <div className={g.cardcontainer}>
            {/* Feed Title with customizable styling */}
            <p
              className={g.inp}
              style={{
                backgroundColor: bgColor !== "#ffffff" ? bgColor : undefined,
                fontSize: sizeFont ? `${sizeFont}px` : `16px`,
                color: textColor ? textColor : "#000000",
                fontWeight: isBold ? "bold" : "normal",
              }}
            >
              {mainTitle || "RSS Feeds"}
            </p>

            <div
              className={g.insidecontainer}
              style={{
                overflowY: autoscroll === "true" ? "scroll" : "visible",
                scrollBehavior: "smooth",
                backgroundColor: feedBgColor || undefined, // done twice to apply bgcolor to both card and background on which card is
              }}
            >
              {displayFeeds.map((feed) => (
                <div
                  className={`${g.usercard} ${g[selectedLayout] || ""}`}
                  key={feed.id || `${feed.title || "untitled"}-${feed.pubDate}`}
                  style={{
                    border: showBorder ? `1px solid ${borderColor}` : "none",
                    padding: "1rem",
                    borderRadius: "8px",
                    height: cardHeight
                      ? `${parseInt(cardHeight)}px`
                      : undefined,
                    width: cardWidth ? `${parseInt(cardWidth)}px` : undefined,
                    backgroundColor: feedBgColor || undefined,
                  }}
                >
                  <Link
                    className={g.newlink}
                    href={feed.feedurl}
                    target="_blank"
                    style={{
                      fontFamily:
                        fontStyle !== "default" ? fontStyle : undefined,
                      display: parseInt(cardHeight) < 150 ? "none" : undefined,
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
                          feed.image.startsWith("http") // full external URL from RSS
                            ? feed.image
                            : `http://localhost:8080/RSS_Widget_Backend/${feed.image}` // fallback for local
                        }
                        alt={feed.title}
                        width={100}
                        style={{
                          height: cardHeight
                            ? `${parseInt(cardHeight) / 2}px`
                            : undefined,
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
                      {(isTitle === undefined ||
                        isTitle === true ||
                        isTitle === "true") && (
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
                            fontWeight: titleBold ? "bold" : "normal",
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
                              fontStyle !== "default" ? fontStyle : undefined,
                            fontSize: descFont
                              ? `${descFont}px`
                              : parseInt(cardHeight) < 170 ||
                                parseInt(cardWidth) < 170
                              ? "10px"
                              : undefined,
                            display:
                              parseInt(cardHeight) < 170 ||
                              parseInt(cardWidth) < 170
                                ? "none"
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
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
