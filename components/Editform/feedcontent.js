import e from "./editform.module.css";

export default function FeedContent({
  formData,
  handleFormChange,
  setIsTitle,
  setFeedBgColor,
  setPostNumber,
  setTitleBold,
  setDescFont,
  setShowDesc,
}) {
  function postNumberChange(alpha) {
    const newNum = Math.max(1, (formData.postNumber || 3) + alpha);
    setPostNumber(newNum);
    handleFormChange("postNumber", newNum);
  }

  function changeFontSize(beta) {
    const newSize = Math.max(1, (formData.descFont || 16) + beta);
    setDescFont(newSize);
    handleFormChange("descFont", newSize);
  }

  return (
    <div className={e.formparent}>
      <div className={e.formtitle}>
        <h4>Feed Content</h4>
      </div>

      {/*Display no. of posts*/}
      <div className={e.content}>
        <div className={e.row}>
          <p>Display(no. of posts) </p>
          <div className={e.incrementContainer}>
            <button
              type="button"
              className={e.incrementBtn}
              onClick={() => {
                postNumberChange(-1);
              }}
            >
              −
            </button>
            <input
              type="number"
              className={e.incrementInput}
              value={formData.postNumber || 3} // Fixed typo: was postNumer
              min="1"
              onChange={(e) => {
                const value = Math.max(1, parseInt(e.target.value) || 3);
                setPostNumber(value);
                handleFormChange("postNumber", value);
              }}
            />
            <button
              type="button"
              className={e.incrementBtn}
              onClick={() => {
                postNumberChange(1);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Background*/}
      <div className={e.row}>
        <label className={e.label}>Background Color</label>
        <div className={e.colorGroup}>
          <input
            type="color"
            className={e.colorInput}
            value={formData.feedBgColor || "#ffffff"}
            onChange={(e) => {
              setFeedBgColor(e.target.value);
              handleFormChange("feedBgColor", e.target.value);
            }}
          />
          <input
            type="text"
            className={e.hexInput}
            value={formData.feedBgColor || "#ffffff"}
            placeholder="#ffffff"
            onChange={(e) => {
              setFeedBgColor(e.target.value);
              handleFormChange("feedBgColor", e.target.value);
            }}
          />
        </div>
      </div>

      {/*Date Format*/}
      <div className={e.content}>
        <div className={e.row}>Date format</div>
        <button
          className={`${e.format} ${e.one}`}
          onClick={() => handleFormChange("dateFormat", "month-dd-yyyy")}
        >
          Month DD, YYYY
        </button>
        <button
          className={`${e.format} ${e.two}`}
          onClick={() => handleFormChange("dateFormat", "dd-mm-yyyy")}
        >
          DD-MM-YYYY
        </button>
      </div>

      {/*Show Title*/}
      <div className={e.content}>
        <div className={e.row}>
          <div className={e.flexRow}>
            <p>Show Title</p>
            <label className={e.switch}>
              <input
                type="checkbox"
                checked={formData.isTitle || false} // Added checked attribute
                onChange={(e) => {
                  setIsTitle(e.target.checked);
                  handleFormChange("isTitle", e.target.checked); // Fixed: was "IsTitle"
                }}
              />
              <span className={e.slider}></span>
            </label>
          </div>
        </div>
      </div>

      {/*Bold Title*/}
      {formData.isTitle && (
        <div className={e.content}>
          <div className={e.row}>
            <div className={e.flexRow}>
              <p>Bold Title</p>
              <label className={e.switch}>
                <input
                  type="checkbox"
                  checked={formData.titleBold || false}
                  onChange={(e) => {
                    setTitleBold(e.target.checked);
                    handleFormChange("titleBold", e.target.checked);
                  }}
                />
                <span className={e.slider}></span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/*Show Description*/}
      <div className={e.content}>
        <div className={e.row}>
          <div className={e.flexRow}>
            <p>Show Description</p>
            <label className={e.switch}>
              <input
                type="checkbox"
                checked={formData.showDesc || false} // Added checked attribute
                onChange={(e) => {
                  setShowDesc(e.target.checked);
                  handleFormChange("showDesc", e.target.checked);
                }}
              />
              <span className={e.slider}></span>
            </label>
          </div>
        </div>
      </div>

      {/*Font Size*/}
      {formData.showDesc && (
        <div className={e.content}>
          <div className={e.row}>
            <p>Font Size</p>
            <div className={e.incrementContainer}>
              <button
                type="button"
                className={e.incrementBtn}
                onClick={() => {
                  changeFontSize(-1);
                }}
              >
                −
              </button>
              <input
                type="number"
                className={e.incrementInput}
                value={formData.descFont || 16} // Fixed: was 3, changed to 16
                min="1"
                max="100"
                onChange={(e) => {
                  const value = Math.max(1, parseInt(e.target.value) || 16);
                  setDescFont(value);
                  handleFormChange("descFont", value);
                }}
              />
              <button
                type="button"
                className={e.incrementBtn}
                onClick={() => {
                  changeFontSize(1);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
