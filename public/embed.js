(function () {
  const script = document.currentScript;
  const widgetId = script.getAttribute("data-widget-id");
  if (!widgetId) return;

  const container = document.createElement("div");
  container.id = "rss-widget-root";
  container.innerText = "Loading widget...";
  script.parentNode.insertBefore(container, script.nextSibling);

  fetch(
    `http://localhost:8080/RSS_Widget_Backend/api/embedwidget.php?id=${widgetId}`
  )
    .then((res) => res.json())
    .then((data) => {
      const settings = data.settings || {};
      const items = data.items || [];

      //   const {
      //     fontFamily = data.fontFamily || "Arial, sans-serif",
      //     borderColor = data.borderColor || "#000000",
      //     border = data.border || true,
      //     feedBgColor = data.feedBgColor || "#ffffff",
      //     textColor = "#000000",
      //     isBold = data.isBold || false,
      //     textAlign = "left",
      //     sizeFont = data.sizeFont || "14px",
      //     width = data.width || "200px",
      //     height = data.height || "350px",
      //     widgetName = data.widget_name || "Widget",
      //   } = settings;
      const widgetName = data.widget_name || "Widget";
      const fontFamily = settings.fontFamily || "Arial, sans-serif";
      const borderColor = settings.borderColor || "#000000";
      const border = settings.border ?? "true"; // using nullish coalescing
      const feedBgColor = settings.feedBgColor || "#ffffff";
      const textColor = settings.textColor || "#000000";
      const isBold = settings.isBold === true; // default false if not true
      const textAlign = settings.textAlign || "left";
      const sizeFont = settings.sizeFont || 14;
      const width = settings.width || 300;
      const height = settings.height || 400;
      // const autoscroll = settings.autoscroll === "true"; // convert to boolean
      const mainTitle = settings.mainTitle || "";
      const wrapperStyle = `
        font-family: ${fontFamily};
        background: ${feedBgColor};
        color: ${textColor};
        padding: 10px;
        width: ${width};
        ${height ? `height: ${height}; overflow-y: auto;` : ""}
        border: ${border === "true" ? `1px solid ${borderColor}` : "none"};
        box-sizing: border-box;
      `;

      const itemStyle = `
        border-bottom: 1px solid #ddd;
        padding: 10px 0;
        text-align: ${textAlign};
        font-size: ${sizeFont}px;
        background-color: ${feedBgColor};
      `;

      const titleStyle = `
        font-weight: ${isBold ? "bold" : "normal"};
        margin: 5px 0;
      `;

      container.innerHTML = `
      
          <h1 style="margin-bottom: 10px; display: block, position: sticky, top :">${widgetName}</h1>
          <h2 >${mainTitle}</h2>
        <div style="${wrapperStyle}">
          ${items
            .map(
              (item) => `
              <div style="${itemStyle}">
                ${
                  item.image
                    ? `<img src="http://localhost:8080/RSS_Widget_Backend${item.image}" style="max-width: 100%; height: auto; margin-bottom: 8px;" />`
                    : ""
                }
                <div style="${titleStyle}">
                  ${
                    item.feedurl
                      ? `<a href="${item.feedurl}" target="_blank" style="color: inherit; text-decoration: none;">${item.title}</a>`
                      : item.title
                  }
                </div>
                ${
                  item.description
                    ? `<div style="margin-top: 5px; font-size: ${sizeFont}px;">${item.description}</div>`
                    : ""
                }
              </div>
              
            `
            )
            .join("")}
        </div>
      `;
    })
    .catch((err) => {
      container.innerText = "Error loading widget.";
      console.error("Embed error:", err);
    });
})();

// (function () {
//   const script = document.currentScript;
//   const widgetId = script.getAttribute("data-widget-id");

//   if (!widgetId) return;

//   const container = document.createElement("div");
//   container.id = "rss-widget-root";
//   container.innerText = "Loading widget...";
//   script.parentNode.insertBefore(container, script.nextSibling);

//   fetch(
//     `http://localhost:8080/RSS_Widget_Backend/api/embedwidget.php?id=${widgetId}`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       const settings = data.settings || {};
//       const items = data.items || [];

//       const {
//         fontFamily = "Arial, sans-serif",
//         borderColor = "#000000",
//         border = true,
//         feedBgColor = "#ffffff",
//         textColor = "#000000",
//         isBold = false,
//         textAlign = "left",
//         sizeFont = 16,
//         width = "100%", // Responsive default
//       } = settings;

//       const cardStyle = `
//         width: ${cardHeight};
//         box-sizing: border-box;
//         font-family: ${fontFamily};
//         background: ${feedBgColor};
//         border: ${border ? `1px solid ${borderColor}` : "none"};
//         padding: 12px;
//         margin: 12px 0;
//         border-radius: 6px;
//         color: ${textColor};
//         text-align: ${textAlign};
//         font-size: ${sizeFont}px;
//         font-weight: ${isBold ? "bold" : "normal"};
//       `;

//       container.innerHTML = `
//         <div style="width: ${width}; box-sizing: border-box; padding: 10px;">
//           <h3 style="margin-bottom: 16px; font-family: ${fontFamily};">${
//         data.widget_name
//       }</h3>
//           ${items
//             .map((item) => {
//               const imageUrl = item.image?.startsWith("http")
//                 ? item.image
//                 : `http://localhost:8080/RSS_Widget_Backend/${item.image}`;

//               return `
//                 <div style="${cardStyle}">
//                   ${
//                     item.image
//                       ? `<img src="${imageUrl}" alt="Feed Image" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 4px;" />`
//                       : ""
//                   }
//                   <div style="margin-top: 8px;">
//                     <a href="${
//                       item.feedurl
//                     }" target="_blank" style="color: #0077cc; text-decoration: none;">
//                       <strong>${item.title}</strong>
//                     </a>
//                     <p style="margin-top: 6px;">${item.description}</p>
//                   </div>
//                 </div>
//               `;
//             })
//             .join("")}
//         </div>
//       `;
//     })
//     .catch((err) => {
//       container.innerText = "Error loading widget.";
//       console.error("Embed error:", err);
//     });
// })();
