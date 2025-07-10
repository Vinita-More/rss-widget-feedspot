"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import w from "./mywidgets.module.css";
import { useRouter } from "next/navigation";
export default function WidgetData() {
  const [widgets, setWidgets] = useState([]);
  const router = useRouter();

  // useEffect(() => {
  //   fetch("http://localhost:8080/RSS_Widget_Backend/api/fetchwidgets.php")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (!data.error) setWidgets(data);
  //       else console.error(data.error);
  //     })
  //     .catch((err) => console.error("API error:", err));
  // }, []);
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
            <Link href="https://youtu.be/ea-ybXtsOCc" target="blank">
              Learn More
            </Link>
          </button>
        </div>
      </div>

      <div className={w.tableContainer}>
        <table className={w.widgetTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {widgets.map((widget) => (
              <tr key={widget.id}>
                <td>{widget.widget_name}</td>
                <td className={w.actionButtons}>
                  <button
                    className={w.actionBtn}
                    onClick={() => handleDelete(widget.id)}
                  >
                    Delete
                  </button>
                  <button className={w.actionBtn}>Embed Code</button>
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
    </div>
  );
}
