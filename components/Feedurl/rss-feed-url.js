import rf from "./feed-url.module.css";
import { useState } from "react";
export default function Search({
  onFolderChange,
  folderId,
  onFeedUrlChange,
  rssInputText,
  setRssInputText,
  setFolderId,
}) {
  const handleChange = (e) => {
    const selectedId = parseInt(e.target.value);
    setFolderId(selectedId); // set folderId in MainPage
    onFolderChange(selectedId); // tell MainPage to switch to folder
    setRssInputText(""); // clear RSS feed input
    onFeedUrlChange(null); // cancel custom feed mode
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setRssInputText(value); // update input
    if (value.trim() !== "") {
      setFolderId(-1); // switch dropdown to “Select Folder”
      onFolderChange(-1);
    }
  };

  const handleGoClick = () => {
    if (rssInputText.trim() !== "") {
      onFeedUrlChange(rssInputText); // fetch via feed URL
      setFolderId(-1); // switch dropdown to “Select Folder”
      onFolderChange(-1);
    }
  };

  return (
    <div>
      <div className={rf.urlform}>
        <div className={rf.heading}>
          <h3>RSS Feed URL</h3>
        </div>

        <label className={rf.label}>Enter Feed URL</label>
        <br />
        <input
          className={rf.input}
          type="text"
          placeholder="Enter RSS Feed URL"
          value={rssInputText}
          onChange={handleUrlChange}
        />
        <button className={rf.button} onClick={handleGoClick}>
          Go
        </button>
        <br />
        <label className={rf.label}>
          OR Select your Feedspot account or Folder Feed URL
        </label>
        <br />
        <select
          className={rf.input}
          value={folderId}
          onChange={handleChange}

          // value={folderId !== undefined && folderId !== null ? folderId : 0}
          //value={Number.isNaN(folderId) ? 0 : folderId}
        >
          <option value="-1">Select Folder</option>
          <option value="0">Homepage</option>
          <option value="1">Technology</option>
          <option value="2">Lifestyle</option>
        </select>
      </div>
    </div>
  );
}
