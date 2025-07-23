"use client";
import v from "./view.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import ViewButtons from "./buttons";

export default function View({
  setSelectedLayout,
  handleFormChange,
  formData,
  isCollapsed,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSide, setSelectedSide] = useState(null);

  const leftCamImages = [
    ["imagetext1.webp", "left_one"],
    ["linesonly.webp", "layout-lines-only"],
    ["foursquare1.webp", "left_three"],
    ["grid41.webp", "left_four"],
    ["fullsquare1.webp", "layout-full-square"],
  ];

  const rightCamImages = [
    ["imagetext2.webp", "right_one"],
    ["linesonly.webp", "layout-lines-only"],
    ["foursquare2.webp", "right_three"],
    ["grid42.webp", "right_four"],
    ["fullsquare2.webp", "single-card-scroll"],
  ];

  // Load saved layout on component mount or when formData changes
  useEffect(() => {
    if (formData && formData.selectedLayout) {
      const leftIndex = leftCamImages.findIndex(
        (img) => img[1] === formData.selectedLayout
      );
      const rightIndex = rightCamImages.findIndex(
        (img) => img[1] === formData.selectedLayout
      );

      if (leftIndex !== -1) {
        setActiveIndex(leftIndex);
        setSelectedSide("left");
        setSelectedLayout(formData.selectedLayout);
      } else if (rightIndex !== -1) {
        setActiveIndex(rightIndex);
        setSelectedSide("right");
        setSelectedLayout(formData.selectedLayout);
      }
    }
  }, [formData.selectedLayout]);

  const handleClick = (index) => {
    setActiveIndex(index);
    // Reset selected side when changing button
    setSelectedSide(null);
  };

  const handleImageClick = (index) => {
    const layoutName = leftCamImages[index][1];
    setSelectedLayout(layoutName);
    setSelectedSide("left");

    // Save to form data
    if (handleFormChange) {
      handleFormChange("selectedLayout", layoutName);
    }
  };

  const handleImageClickRight = (index) => {
    const layoutName = rightCamImages[index][1];
    setSelectedLayout(layoutName);
    setSelectedSide("right");

    // Save to form data
    if (handleFormChange) {
      handleFormChange("selectedLayout", layoutName);
    }
  };

  return (
    <div className={`${v.first}`}>
      <div className={`${v.viewdiv} ${isCollapsed ? v.collapsed : v.expanded}`}>
        <div className={v.heading}>
          <p>Following Views</p>
          <ViewButtons onClick={handleClick} activeIndex={activeIndex} />
        </div>

        <div className={v.viewlayout}>
          <div className={v.childdiv}>
            <button
              className={`${v.changeimage} ${
                selectedSide === "left" &&
                leftCamImages[activeIndex][1] === formData?.selectedLayout
                  ? v.selectedImage
                  : ""
              }`}
              onClick={() => handleImageClick(activeIndex)}
            >
              <Image
                src={`/images/${leftCamImages[activeIndex][0]}`}
                width={270}
                height={270}
                alt="layout image"
              />
            </button>
          </div>

          <div className={v.childdiv}>
            <button
              className={`${v.changeimage} ${
                selectedSide === "right" &&
                rightCamImages[activeIndex][1] === formData?.selectedLayout
                  ? v.selectedImage
                  : ""
              }`}
              onClick={() => handleImageClickRight(activeIndex)}
            >
              <Image
                src={`/images/${rightCamImages[activeIndex][0]}`}
                width={270}
                height={270}
                alt="layout image"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// "use client";
// import v from "./view.module.css";
// import Image from "next/image";
// import { useState } from "react";
// import ViewButtons from "./buttons";
// export default function View({ setSelectedLayout }) {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleClick = (index) => {
//     setActiveIndex(index);
//     //setSelectedLayout(leftCamImages[index][1]); // send class name
//   };

//   const handleImageClick = (index) => {
//     //setActiveIndex(index);
//     setSelectedLayout(leftCamImages[index][1]);
//   };

//   const handleImageClickRight = (index) => {
//     //setActiveIndex(index);
//     setSelectedLayout(rightCamImages[index][1]);
//   };
//   const leftCamImages = [
//     ["imagetext1.webp", "layout-image-text"],
//     ["linesonly.webp", "layout-lines-only"],
//     ["foursquare1.webp", "layout-four-square"],
//     ["grid41.webp", "layout-grid-4"],
//     ["fullsquare1.webp", "layout-full-square"],
//   ];

//   const rightCamImages = [
//     ["imagetext2.webp", "image-layout-right"],
//     ["linesonly.webp", "layout-lines-only"],
//     ["foursquare2.webp", "layout-four-right"],
//     ["grid42.webp", "grid-layout-right"],
//     ["fullsquare2.webp", "single-card-scroll"],
//   ];

//   return (
//     <div className={v.first}>
//       <div className={v.viewdiv}>
//         <div className={v.heading}>
//           <h3>Following Views</h3>
//           <ViewButtons onClick={handleClick} />
//         </div>

//         <div className={v.viewlayout}>
//           <div className={v.childdiv}>
//             <button
//               className={v.changeimage}
//               onClick={() => handleImageClick(activeIndex)}
//             >
//               <Image
//                 src={`/images/${leftCamImages[activeIndex][0]}`}
//                 width={270}
//                 height={270}
//                 alt="layout image"
//               />
//             </button>
//           </div>

//           <div className={v.childdiv}>
//             <button
//               className={v.changeimage}
//               onClick={() => handleImageClickRight(activeIndex)}
//             >
//               <Image
//                 src={`/images/${rightCamImages[activeIndex][0]}`}
//                 width={270}
//                 height={270}
//                 alt="layout image"
//               />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
