"use client";
import Link from "next/link";
import g from "./card.module.css";
import { useState, useEffect } from "react";

export default function Card({ showBorder, borderColor, displayImg }) {
  const [feeds, setFeed] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/RSS_Widget_Backend/api/index.php")
      .then((res) => res.json())
      .then((data) => setFeed(data))
      .catch((err) => console.error("API error:", err));
  }, []);

  if (!feeds.length) return <p>Loading...</p>;
  return (
    <div className={g.h1}>
      {/*Feedspot Widget is a handy widget which lets you embed and display latest updates from your favourite sources (Blogs, News Websites, Podcasts, Youtube Channels, RSS Feeds, etc) on your website. Watch Video
       */}
      <div>
        <div className={g.div1}>
          <input
            type="text"
            placeholder="Enter Widget Name"
            className={g.searchInput}
          />
          <div className={g.buttonGroup}>
            <button
              className={g.savebutton}
              style={{ backgroundColor: "#f3d43c" }}
            >
              Save & Get code
            </button>
            <button className={g.savebutton}>Reset</button>
          </div>
        </div>

        <div className={g.cardcontainer}>
          <p className={g.inp}>My RSS Feed</p>
          <div className={g.insidecontainer}>
            {feeds.map((feed) => (
              <div
                className={g.usercard}
                key={feed.id}
                style={{
                  border: showBorder ? `1px solid ${borderColor}` : "none",
                  padding: "1rem",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={`http://localhost:8080/RSS_Widget_Backend/${feed.image}`}
                  alt={feed.title}
                  width={100}

                  //   style={{displayImg ? "" : "none"}}
                />

                <h1>{feed.title}</h1>
                <p>{feed.description}</p>
                <Link href={feed.feedurl} alt={feed.title} target="_blank">
                  Click here to view full article
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
