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
}) {
  const [feeds, setFeed] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchFeeds = async () => {
      setErrorMsg("");

      // ✅ Use feedUrl only if user has NOT explicitly selected a folder
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
        // ✅ Fallback to database feeds (based on folderId)
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
              value={widgetName || ""}
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
            <p className={g.inp}>My RSS Feed</p>

            <div
              className={g.insidecontainer}
              style={{
                overflowY: autoscroll === "true" ? "scroll" : "visible",
                // maxHeight: autoscroll === "true" ? "680px" : "auto", // optional
                scrollBehavior: "smooth",
              }}
            >
              {feeds.map((feed) => (
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
                  }}
                >
                  {feed.image && (
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
                  )}
                  <div>
                    <h1
                      className={g.newlink}
                      style={{
                        textAlign: textAlign,
                        fontFamily:
                          fontStyle !== "default" ? fontStyle : "default",
                        display: cardHeight
                          ? `${parseInt(cardHeight)}px`
                          : undefined,
                        fontSize:
                          formData.height && parseInt(formData.height) < 150
                            ? "10px"
                            : undefined,
                      }}
                    >
                      {feed.title}
                    </h1>

                    <p
                      className={g.descriptionClamp}
                      style={{
                        textAlign: textAlign,
                        fontFamily:
                          fontStyle !== "default" ? fontStyle : undefined,
                        fontSize:
                          parseInt(cardHeight) < 170 ||
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

                    {typeof feed.feedurl === "string" &&
                    feed.feedurl.trim() !== "" ? (
                      <Link
                        className={g.newlink}
                        href={feed.feedurl}
                        target="_blank"
                        style={{
                          fontFamily:
                            fontStyle !== "default" ? fontStyle : undefined,
                          display:
                            parseInt(cardHeight) < 150 ? "none" : undefined,
                          fontSize:
                            parseInt(cardHeight) < 150 ||
                            parseInt(cardWidth) < 150
                              ? "10px"
                              : undefined,
                        }}
                      >
                        Click here to view full article
                      </Link>
                    ) : (
                      <p style={{ color: "gray" }}>No link available</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import Link from "next/link";
// import g from "./card.module.css";
// import { useState, useEffect } from "react";

// export default function Card({ showBorder, borderColor, displayImg }) {
//   const [feeds, setFeed] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8080/RSS_Widget_Backend/api/index.php")
//       .then((res) => res.json())
//       .then((data) => setFeed(data))
//       .catch((err) => console.error("API error:", err));
//   }, []);

//   if (!feeds.length) return <p>Loading...</p>;
//   return (
//     <div className={g.h1}>
//       {/*Feedspot Widget is a handy widget which lets you embed and display latest updates from your favourite sources (Blogs, News Websites, Podcasts, Youtube Channels, RSS Feeds, etc) on your website. Watch Video
//        */}
//       <div>
//         <div className={g.div1}>
//           <input
//             type="text"
//             placeholder="Enter Widget Name"
//             className={g.searchInput}
//           />
//           <div className={g.buttonGroup}>
//             <button
//               className={g.savebutton}
//               style={{ backgroundColor: "#f3d43c" }}
//             >
//               Save & Get code
//             </button>
//             <button className={g.savebutton}>Reset</button>
//           </div>
//         </div>

//         <div className={g.cardcontainer}>
//           <p className={g.inp}>My RSS Feed</p>
//           <div className={g.insidecontainer}>
//             {feeds.map((feed) => (
//               <div
//                 className={g.usercard}
//                 key={feed.id}
//                 style={{
//                   border: showBorder ? `1px solid ${borderColor}` : "none",
//                   padding: "1rem",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <img
//                   src={`http://localhost:8080/RSS_Widget_Backend/${feed.image}`}
//                   alt={feed.title}
//                   width={100}

//                   //   style={{displayImg ? "" : "none"}}
//                 />

//                 <h1>{feed.title}</h1>
//                 <p>{feed.description}</p>

//                 {feed.feedurl ? (
//                   <Link href={feed.feedurl} target="_blank">
//                     Click here to view full article
//                   </Link>
//                 ) : (
//                   <p style={{ color: "gray" }}>No link available</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
