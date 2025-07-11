import rf from "./feed-url.module.css";
export default function Search({ onFolderChange, folderId }) {
  const handleChange = (e) => {
    const selectedId = parseInt(e.target.value);
    console.log("Selected folderId:", selectedId);
    onFolderChange(selectedId);
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
          defaultValue={"https://www.feedspot.com/widgets/create?_src=fsbeta"}
        />
        <button className={rf.button}> Go </button>
        <br />
        <label className={rf.label}>
          OR Select your Feedspot account or Folder Feed URL
        </label>
        <br />
        <select
          className={rf.input}
          onChange={handleChange}
          // value={folderId !== undefined && folderId !== null ? folderId : 0}
          value={Number.isNaN(folderId) ? 0 : folderId}
        >
          <option value="0">Homepage</option>
          <option value="1">Technology</option>
          <option value="2">Lifestyle</option>
        </select>
      </div>
    </div>
  );
}
