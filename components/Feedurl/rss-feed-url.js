import rf from "./feed-url.module.css";
import useWidgetStore from "@/Store/widgetStore";

export default function Search() {
  const {
    folderId,
    isCollapsed,
    rssInputText,
    setFolderId,
    setRssInputText,
    setCustomFeedUrl,
  } = useWidgetStore();

  const handleChange = (e) => {
    const selectedId = parseInt(e.target.value);
    setFolderId(selectedId);
    setRssInputText(""); // clear RSS feed input
    setCustomFeedUrl(null); // cancel custom feed mode
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setRssInputText(value); // update input
    if (value.trim() !== "") {
      setFolderId(-1); // switch dropdown to "Select Folder"
    }
  };

  const handleGoClick = () => {
    if (rssInputText.trim() !== "") {
      setCustomFeedUrl(rssInputText); // fetch via feed URL
      setFolderId(-1); // switch dropdown to "Select Folder"
    }
  };

  return (
    <div>
      <div
        className={`${rf.urlform} ${isCollapsed ? rf.collapsed : rf.expanded}`}
      >
        <div className={rf.heading}>
          <p>RSS Feed URL</p>
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
          value={folderId ? Number(folderId) : 0}
          onChange={handleChange}
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
