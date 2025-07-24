"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import w from "./mywidgets.module.css";
import { useRouter } from "next/navigation";
export default function WidgetData() {
  const [widgets, setWidgets] = useState([]);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [embedCode, setEmbedCode] = useState("");

  const router = useRouter();

  const folderNames = {
    0: "Homepage",
    1: "Technology",
    2: "Lifestyle",
    "-1": "Custom Feed URL",
  };

  const handleEmbedCode = async (widgetId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/RSS_Widget_Backend/api/fetchonewidget.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ id: widgetId }),
        }
      );

      const data = await res.json();

      if (data && !data.error) {
        const code = `<script 
  src="http://localhost/embed.js"
  data-widget-id="${widgetId}"
  data-height="${data.height || "400px"}"
  data-width="${data.width || "100%"}"
  data-border="${data.border === "true"}"
  data-font="${data.font_style || "Arial"}"
  data-font-size="${data.fontSize || "16px"}"
></script>`;

        setEmbedCode(code);
        setShowEmbedModal(true);
      } else {
        alert("Widget not found or failed to fetch settings.");
      }
    } catch (err) {
      console.error("Embed fetch error:", err);
      alert("Failed to generate embed code.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    fetch("http://localhost:8080/RSS_Widget_Backend/api/fetchwidgets.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}), // No need to send email, token has it
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error("Auth error:", data.error);
        } else {
          setWidgets(data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this widget?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        "http://localhost:8080/RSS_Widget_Backend/api/deletewidget.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );

      const result = await res.json();
      if (result.success) {
        alert("Widget deleted");
        // Refresh list after deletion:
        //fetchWidgets();
        setWidgets((prev) => prev.filter((widget) => widget.id !== id));
      } else {
        alert(result.error || "Failed to delete widget");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className={w.maindiv}>
      <div className={w.maindiv2}>
        <h1>My Widgets</h1>

        <div className={w.maindiv3}>
          <button>
            <Link href="/widget">Create New Widget</Link>
          </button>
          <button>
            <a href="https://youtu.be/ea-ybXtsOCc" target="blank">
              Learn More
            </a>
          </button>
        </div>
      </div>

      <div className={w.tableContainer}>
        <table className={w.widgetTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Feed URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {widgets.map((widget) => (
              <tr key={widget.id}>
                <td>{widget.widget_name}</td>

                <td>
                  {widget.feed_url ? (
                    <a href={widget.feed_url} target="_blank">
                      {widget.feed_url}
                    </a>
                  ) : (
                    folderNames[widget.folder_id] || "Unknown"
                  )}
                </td>

                <td className={w.actionButtons}>
                  <button
                    className={w.actionBtn}
                    onClick={() => handleDelete(widget.id)}
                  >
                    Delete
                  </button>

                  <button
                    className={w.actionBtn}
                    onClick={() => handleEmbedCode(widget.id)}
                  >
                    Embed Code
                  </button>

                  <button
                    className={w.actionBtn}
                    onClick={() =>
                      (window.location.href = `/widget?edit=true&id=${widget.id}`)
                    }
                  >
                    Edit Widget
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* for popup on clicking embed code */}
      {showEmbedModal && (
        <div className={w.modalOverlay}>
          <div className={w.modal}>
            <h2>Embed Code</h2>
            <textarea
              readOnly
              value={embedCode}
              style={{
                width: "100%",
                height: "100px",
                fontFamily: "monospace",
              }}
            />
            <button onClick={() => setShowEmbedModal(false)}>Close</button>
          </div>
        </div>
      )}
      {/*  */}
    </div>
  );
}

// useEffect(() => {
//   fetch("http://localhost:8080/RSS_Widget_Backend/api/fetchwidgets.php")
//     .then((res) => res.json())
//     .then((data) => {
//       if (!data.error) setWidgets(data);
//       else console.error(data.error);
//     })
//     .catch((err) => console.error("API error:", err));
// }, []);
// const handleEmbedCode = (widgetId) => {
//   const script = `<script src="http://localhost/embed.js" data-widget-id="${widgetId}"></script>`;
//   setEmbedCode(script);
//   setShowEmbedModal(true);
// };
