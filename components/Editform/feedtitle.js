"use client";
import e from "./editform.module.css";
import { useState } from "react";

export default function Feedtitle({
  setBgColor,
  setSizeFont,
  setTextColor,
  setMainTitle,
  setBold,
  formData,
  handleFormChange,
}) {
  const [isCustom, setIsCustom] = useState(true);

  const increment = () => {
    const newSize = (formData.sizeFont || 16) + 1;
    setSizeFont(newSize);
    handleFormChange("sizeFont", newSize);
  };

  const decrement = () => {
    const newSize = Math.max(1, (formData.sizeFont || 16) - 1);
    setSizeFont(newSize);
    handleFormChange("sizeFont", newSize);
  };

  return (
    <div className={e.formparent}>
      <div className={e.formtitle}>
        <p>Feed Title</p>
      </div>

      {/* To Change feed title */}
      <div className={e.content}>
        <div className={e.row}>
          <div className={e.flexRow}>
            <p>Custom</p>
            <label className={e.switch}>
              <input
                type="checkbox"
                checked={isCustom}
                onChange={(e) => setIsCustom(e.target.checked)}
              />
              <span className={e.slider}></span>
            </label>
          </div>
        </div>
      </div>

      {isCustom && (
        <div className={`${e.animatedSettings} ${isCustom ? e.show : e.hide}`}>
          {/* Main title input */}
          <div className={e.content}>
            <div className={e.row}>
              <p>Main Title</p>
              <label>
                <input
                  type="text"
                  name="main-title"
                  value={formData.mainTitle || ""}
                  className={e.maintitle}
                  onChange={(e) => {
                    setMainTitle(e.target.value); // Fixed: Uncommented this line
                    handleFormChange("mainTitle", e.target.value);
                  }}
                />
              </label>
            </div>
          </div>

          {/* Font size */}
          <div className={e.content}>
            <div className={e.row}>
              <p>Font Size</p>
              <div className={e.incrementContainer}>
                <button onClick={decrement} className={e.incrementBtn}>
                  −
                </button>
                <input
                  type="number"
                  value={formData.sizeFont || 16}
                  className={e.incrementInput}
                  onChange={(e) => {
                    const newSize = parseInt(e.target.value) || 16;
                    setSizeFont(newSize);
                    handleFormChange("sizeFont", newSize);
                  }}
                />
                <button onClick={increment} className={e.incrementBtn}>
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Bold */}
          <div className={e.content}>
            <div className={e.row}>
              <div className={e.flexRow}>
                <p>Bold &nbsp;&nbsp;&nbsp;&nbsp;</p>
                <label className={e.switch}>
                  <input
                    type="checkbox"
                    checked={formData.isBold || false} // Fixed: Added checked attribute
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setBold(checked);
                      handleFormChange("isBold", checked);
                    }}
                  />
                  <span className={e.slider}></span>
                </label>
              </div>
            </div>
          </div>

          {/* Background color*/}
          <div className={e.row}>
            <label className={e.label}>Background Color</label>
            <div className={e.colorGroup}>
              <input
                type="color"
                value={formData.bgColor || "#ffffff"}
                onChange={(e) => {
                  setBgColor(e.target.value);
                  handleFormChange("bgColor", e.target.value);
                }}
                className={e.colorInput}
              />
              <input
                type="text"
                value={formData.bgColor || "#ffffff"}
                onChange={(e) => {
                  setBgColor(e.target.value);
                  handleFormChange("bgColor", e.target.value);
                }}
                className={e.hexInput}
              />
            </div>
          </div>

          {/* Font Color*/}
          <div className={e.row}>
            <label className={e.label}>Font Color</label>
            <div className={e.colorGroup}>
              <input
                type="color"
                value={formData.textColor || "#000000"}
                onChange={(e) => {
                  setTextColor(e.target.value);
                  handleFormChange("textColor", e.target.value);
                }}
                className={e.colorInput}
              />
              <input
                type="text"
                value={formData.textColor || "#000000"}
                onChange={(e) => {
                  setTextColor(e.target.value);
                  handleFormChange("textColor", e.target.value);
                }}
                className={e.hexInput}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
