import s from "./topbody.module.css";
export default function Side({ isCollapsed }) {
  return (
    <div className={`${isCollapsed ? s.collapsed : s.expanded}`}>
      {/* This div is parent div of headings content on the page */}
      <div className={s.main}>
        <header className={s.name}>
          <h1> Feedspot Widgets</h1>
          <h2>Embed RSS Widget on your Website</h2>
        </header>

        {/* This div is the parent div of left and right content on the page */}
        <div>
          <div className={s.left}>
            Feedspot Widget is a handy widget which lets you embed and display
            latest updates from your favourite sources (Blogs, News Websites,
            Podcasts, Youtube Channels, RSS Feeds, etc) on your website. Watch
            Video
          </div>

          <div className={s.right}>
            <ul>
              <li>
                Step 1 - Get started by adding your favourite websites to your
                account as content source for widget. Watch Video
              </li>

              <li>
                Step 2 - Customize the look and feel of the widget to match your
                website style.
              </li>

              <li>
                Step 3 - Click on "Save and Get Code" button, copy the embed
                code and paste on your website.
              </li>

              <li>
                Step 4 - Widget updates automatically when new content is
                available.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <br />
      <br />

      <br />
      <br />
    </div>
  );
}
