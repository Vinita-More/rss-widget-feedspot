"use client";
import { useState } from "react";
import e from "./editform.module.css";
export default function General({
  setShowBorder,
  setBorderColor,
  setTextAlign,
  setFontStyle,
  setAutoscroll,
  setCardHeight,
  setCardWidth,
  formData,
  handleFormChange,
  isCollapsed,
}) {
  return (
    <div
      className={`${e.formparent} ${isCollapsed ? e.collapsed : e.expanded}`}
    >
      <div className={e.formtitle}>
        <p>General</p>
      </div>

      {/* Height */}
      <div className={e.content}>
        <h4>Height</h4>
        <div className={e.row}>
          <label>
            <input
              type="radio"
              name="heightMode"
              value="pixels"
              onChange={(e) => {
                //   handleChange(e);
                setCardHeight(e.target.value);
                handleFormChange("heightMode", e.target.value);
              }}
            />
            In Pixels
          </label>
          <input
            type="number"
            name="height"
            value={formData.height ?? ""}
            onChange={(e) => {
              setCardHeight(e.target.value);
              handleFormChange("height", e.target.value);
            }}
            disabled={formData.heightMode !== "pixels"}
          />
        </div>
        <div className={e.row}>
          <label>
            <input
              defaultChecked
              type="radio"
              name="heightMode"
              value="posts"
              onChange={(e) => {
                //    handleChange(e);
                handleFormChange("heightMode", e.target.value);
              }}
            />
            Posts
          </label>
        </div>
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
              onChange={(e) => {
                //    handleChange(e);
                handleFormChange("widthMode", e.target.value);
              }}
            />{" "}
            In Pixels
          </label>
          <input
            type="number"
            name="width"
            value={formData.width || ""}
            onChange={(e) => {
              // handleChange;
              setCardWidth(e.target.value);
              handleFormChange("width", e.target.value);
            }}
            disabled={formData.widthMode !== "pixels"}
          />
        </div>
        <div className={e.row}>
          <label>
            <input
              type="radio"
              name="widthMode"
              value="width"
              defaultChecked
              onChange={(e) => {
                //   handleChange(e);
                handleFormChange("width", e.target.value);
              }}
            />
            Responsive (Mobile Friendly)
          </label>
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
            checked={formData.autoscroll === "true"}
            onChange={(e) => {
              // handleChange(e);
              setAutoscroll("true");
              handleFormChange("autoscroll", e.target.value);
            }}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="autoscroll"
            value="false"
            checked={formData.autoscroll === "false"}
            onChange={(e) => {
              // handleChange(e);
              setAutoscroll("false");
              handleFormChange("autoscroll", e.target.value);
            }}
          />
          No
        </label>
      </div>

      {/* Font Style */}
      <div className={e.content}>
        <p>Font styles</p>
        <select
          name="fontStyle"
          value={formData.fontStyle ?? ""}
          onChange={(e) => {
            // handleChange(e);
            setFontStyle(e.target.value);
            handleFormChange("fontStyle", e.target.value);
          }}
        >
          <option value="default">Default Browser font</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>

      {/* Text  Align*/}
      <div className={e.content}>
        <p>Text Alignment</p>
        <select
          name="textAlign"
          value={formData.textAlign ?? "left"}
          onChange={(e) => {
            // handleChange(e);
            setTextAlign(e.target.value);
            handleFormChange("textAlign", e.target.value);
          }}
        >
          <option value="left">Left</option>
          <option value="right">Right</option>
          <option value="center">Center</option>
          <option value="justify">Justify</option>
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
              //  handleChange(e);
              setShowBorder(true);
              handleFormChange("border", e.target.value);
            }}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="border"
            value="false"
            checked={formData.border === "false"}
            onChange={(e) => {
              //  handleChange(e);
              setShowBorder(false);
              handleFormChange("border", e.target.value);
            }}
          />
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
            value={formData.borderColor || "#000000"}
            onChange={(e) => {
              //  handleChange(e);
              setBorderColor(e.target.value);
              handleFormChange("borderColor", e.target.value);
            }}
          />
        </div>
      )}

      {/* Save Button */}
      {/* <div className={e.content}>
        <button onClick={handleSubmit}>Save Settings</button>
      </div> */}
    </div>
  );
}
