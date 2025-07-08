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
}) {
  const [feeds, setFeed] = useState([]);
  //const [widgetName, setWidgetName] = useState("");
  useEffect(() => {
    const url =
      folderId > 0
        ? `http://localhost:8080/RSS_Widget_Backend/api/index.php?folder_id=${folderId}`
        : `http://localhost:8080/RSS_Widget_Backend/api/index.php`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setFeed(data))
      .catch((err) => console.error("API error:", err));
  }, [folderId]);

  if (!feeds.length) return <p>Loading...</p>;

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
              value={widgetName}
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
                  key={feed.id}
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
                      src={`http://localhost:8080/RSS_Widget_Backend/${feed.image}`}
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
                      style={{
                        textAlign: textAlign,
                        fontFamily:
                          fontStyle !== "default" ? fontStyle : undefined,
                        fontSize:
                          parseInt(cardHeight) < 150 ? "10px" : undefined,
                        display:
                          parseInt(cardHeight) < 150 ? "none" : undefined,
                      }}
                    >
                      {feed.description}
                    </p>

                    {typeof feed.feedurl === "string" &&
                    feed.feedurl.trim() !== "" ? (
                      <Link
                        href={feed.feedurl}
                        target="_blank"
                        style={{
                          fontFamily:
                            fontStyle !== "default" ? fontStyle : undefined,
                          display:
                            parseInt(cardHeight) < 150 ? "none" : undefined,
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
