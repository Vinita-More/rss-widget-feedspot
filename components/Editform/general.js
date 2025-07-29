"use client";
import e from "./editform.module.css";
import useWidgetStore from "@/Store/widgetStore";

export default function General({ isCollapsed }) {
  // Get state and actions from Zustand store
  const {
    formData,
    handleFormChange,
    setShowBorder,
    setBorderColor,
    setTextAlign,
    setFontStyle,
    setAutoscroll,
    setCardDimensions,
  } = useWidgetStore();

  return (
    <div
      className={`${e.formparent} ${isCollapsed ? e.collapsed : e.expanded}`}
    >
      <div className={e.formtitle}>
        <p>General</p>
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
              checked={formData.heightMode === "pixels"}
              onChange={(e) => {
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
              const value = e.target.value;
              setCardDimensions(value, formData.width);
              handleFormChange("height", value);
            }}
            disabled={formData.heightMode !== "pixels"}
          />
        </div>
        <div className={e.row}>
          <label>
            <input
              type="radio"
              name="heightMode"
              value="posts"
              checked={formData.heightMode === "posts" || !formData.heightMode}
              onChange={(e) => {
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
              checked={formData.widthMode === "pixels"}
              onChange={(e) => {
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
              const value = e.target.value;
              setCardDimensions(formData.height, value);
              handleFormChange("width", value);
            }}
            disabled={formData.widthMode !== "pixels"}
          />
        </div>
        <div className={e.row}>
          <label>
            <input
              type="radio"
              name="widthMode"
              value="Responsive (Mobile friendly)"
              checked={
                formData.widthMode === "Responsive (Mobile friendly)" ||
                !formData.widthMode
              }
              onChange={(e) => {
                handleFormChange("widthMode", e.target.value);
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
          value={formData.fontStyle ?? "default"}
          onChange={(e) => {
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

      {/* Text Align */}
      <div className={e.content}>
        <p>Text Alignment</p>
        <select
          name="textAlign"
          value={formData.textAlign ?? "left"}
          onChange={(e) => {
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
            checked={formData.border === "true"}
            onChange={(e) => {
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
              setBorderColor(e.target.value);
              handleFormChange("borderColor", e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
}
