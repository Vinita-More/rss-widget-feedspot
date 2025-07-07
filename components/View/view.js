"use client";
import v from "./view.module.css";
import Image from "next/image";
import { useState } from "react";
import ViewButtons from "./buttons";
export default function View({ setSelectedLayout }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
    //setSelectedLayout(leftCamImages[index][1]); // send class name
  };

  const handleImageClick = (index) => {
    //setActiveIndex(index);
    setSelectedLayout(leftCamImages[index][1]);
  };

  const handleImageClickRight = (index) => {
    //setActiveIndex(index);
    setSelectedLayout(rightCamImages[index][1]);
  };
  const leftCamImages = [
    ["imagetext1.webp", "layout-image-text"],
    ["linesonly.webp", "layout-lines-only"],
    ["foursquare1.webp", "layout-four-square"],
    ["grid41.webp", "layout-grid-4"],
    ["fullsquare1.webp", "layout-full-square"],
  ];

  const rightCamImages = [
    ["imagetext2.webp", "image-layout-right"],
    ["linesonly.webp", "layout-lines-only"],
    ["foursquare2.webp", "layout-four-right"],
    ["grid42.webp", "grid-layout-right"],
    ["fullsquare2.webp", "single-card-scroll"],
  ];

  return (
    <div className={v.first}>
      <div className={v.viewdiv}>
        <div className={v.heading}>
          <h3>Following Views</h3>
          <ViewButtons onClick={handleClick} />
        </div>

        <div className={v.viewlayout}>
          <div className={v.childdiv}>
            <button
              className={v.changeimage}
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
              className={v.changeimage}
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
