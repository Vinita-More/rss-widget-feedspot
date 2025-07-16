import e from "./editform.module.css";
export default function Feedtitle() {
  return (
    <div className={e.formparent}>
      <div className={e.formtitle}>
        <p>Feed Title</p>
      </div>

      {/* Height */}
      <div className={e.content}>
        <p>Custom</p>
        <div className={e.row}>
          <label>
            <input type="radio" name="heightMode" value="pixels" />
            Yes
          </label>
        </div>
        <div className={e.row}>
          <label>
            <input
              defaultChecked
              type="radio"
              name="heightMode"
              value="posts"
            />
            No
          </label>
        </div>
      </div>

      {/* Width */}
      <div className={e.content}>
        <p>Main Title</p>
        <div className={e.row}>
          <label>
            <input type="text" name="widthMode" />
          </label>
        </div>
      </div>

      {/* Autoscroll */}
      <div className={e.content}>
        <p>Bold</p>
        <label>
          <input type="radio" name="autoscroll" value="true" />
          Yes
        </label>
        <label>
          <input type="radio" name="autoscroll" value="false" />
          No
        </label>
      </div>

      {/* Font Style */}
      <div className={e.content}>
        <p>Font styles</p>
        <select name="fontStyle">
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
        <select name="textAlign">
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
          />
          Yes
        </label>
        <label>
          <input type="radio" name="border" value="false" />
          No
        </label>
      </div>

      {/* Background Color */}
      <div className={e.content}>
        <p>Background color</p>
        <input type="color" name="borderColor" />
      </div>
      {/* Font Color */}
      <div className={e.content}>
        <p>Font color</p>
        <input type="color" name="borderColor" />
      </div>

      {/* Save Button */}
      {/* <div className={e.content}>
        <button onClick={handleSubmit}>Save Settings</button>
      </div> */}
    </div>
  );
}
