"use client";
import { useState } from "react";
import e from "./editform.module.css";
export default function General({ setShowBorder, setBorderColor }) {
  const [formData, setFormData] = useState({
    widthMode: "",
    width: "",
    heightMode: "",
    height: "",
    autoscroll: "",
    openLinks: "",
    fontStyle: "",
    border: "",
    borderColor: "#000000",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/RSS_Widget_Backend/api/save_settings.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const text = await res.text();
      console.log("Raw response:", text);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const result = JSON.parse(text);
      alert(result.message || "Settings saved");
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  };

  //   const updateDisable = () => {
  //     setDisabled(!isDisabled);
  //   };
  return (
    <div className={e.formparent}>
      <div className={e.formtitle}>
        <p>General</p>
      </div>

      {/* Width */}
      <div className={e.content}>
        <p>Width</p>
        <div className={e.row}>
          <label>
            <input
              type="radio"
              name="widthMode"
              value="pixels"
              defaultChecked
              onChange={handleChange}
            />
            In Pixels
          </label>
          <input
            type="text"
            name="width"
            onChange={handleChange}
            disabled={formData.widthMode !== "pixels"}
          />
        </div>
        <div className={e.row}>
          <label>
            <input
              type="radio"
              name="widthMode"
              value="responsive"
              onChange={handleChange}
            />
            Responsive (Mobile Friendly)
          </label>
        </div>
      </div>

      {/* Height */}
      <div className={e.content}>
        <p>Height</p>
        <div className={e.row}>
          <label>
            <input
              type="radio"
              name="heightMode"
              value="pixels"
              onChange={handleChange}
            />{" "}
            In Pixels
          </label>
          <input
            type="text"
            name="height"
            onChange={handleChange}
            disabled={formData.heightMode !== "pixels"}
          />
        </div>
        <div className={e.row}>
          <label>
            <input
              type="radio"
              name="heightMode"
              value="posts"
              defaultChecked
              onChange={handleChange}
            />{" "}
            Posts
          </label>
          <input
            type="text"
            name="height"
            min="1"
            defaultChecked
            defaultValue="3"
            onChange={handleChange}
            disabled={formData.heightMode !== "posts"}
          />
        </div>
      </div>

      {/* Autoscroll */}
      <div className={e.content}>
        <p>Autoscroll</p>
        <label>
          <input
            type="radio"
            name="autoscroll"
            value="true"
            onChange={handleChange}
          />{" "}
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="autoscroll"
            value="false"
            defaultChecked
            onChange={handleChange}
          />{" "}
          No
        </label>
      </div>

      {/* Open Links */}
      <div className={e.content}>
        <p>Open links</p>
        <select name="openLinks" onChange={handleChange}>
          <option value="same">Same window</option>
          <option value="new">Different window</option>
        </select>
      </div>

      {/* Font Style */}
      <div className={e.content}>
        <p>Font styles</p>
        <select name="fontStyle" onChange={handleChange}>
          <option value="default">Default Browser font</option>
          <option value="times">Times New Roman</option>
        </select>
      </div>

      {/* Border */}
      <div className={e.content}>
        <p>Border</p>
        <label>
          <input
            type="radio"
            name="border"
            value="true"
            // defaultChecked
            checked={formData.border === "true"}
            onChange={(e) => {
              handleChange(e);
              setShowBorder(true);
            }}
          />{" "}
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="border"
            value="false"
            checked={formData.border === "false"}
            onChange={(e) => {
              handleChange(e);
              setShowBorder(false);
            }}
          />{" "}
          No
        </label>
      </div>

      {/* Border Color */}
      {formData.border === "true" && (
        <div className={e.content}>
          <p>Border color</p>
          <input
            type="color"
            name="borderColor"
            value={formData.borderColor}
            onChange={(e) => {
              handleChange(e);
              setBorderColor(e.target.value);
            }}
          />
        </div>
      )}

      {/* Save Button */}
      <div className={e.content}>
        <button onClick={handleSubmit}>Save Settings</button>
      </div>
    </div>
  );
}
