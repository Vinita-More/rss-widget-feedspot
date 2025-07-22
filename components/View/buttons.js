import {
  FaThLarge,
  FaBars,
  FaTh,
  FaGripHorizontal,
  FaSquareFull,
} from "react-icons/fa";
import v from "./view.module.css";

export default function ViewButtons({ onClick, activeIndex }) {
  return (
    <div>
      <button
        className={`${v.viewbutton} ${activeIndex === 0 ? v.active : ""}`}
        onClick={() => onClick(0)}
      >
        <FaThLarge
          className={`${v.buttonIcon} ${activeIndex === 0 ? v.activeIcon : ""}`}
          size={20}
        />
      </button>

      <button
        className={`${v.viewbutton} ${activeIndex === 1 ? v.active : ""}`}
        onClick={() => onClick(1)}
      >
        <FaBars
          className={`${v.buttonIcon} ${activeIndex === 1 ? v.activeIcon : ""}`}
          size={20}
        />
      </button>

      <button
        className={`${v.viewbutton} ${activeIndex === 2 ? v.active : ""}`}
        onClick={() => onClick(2)}
      >
        <FaTh
          className={`${v.buttonIcon} ${activeIndex === 2 ? v.activeIcon : ""}`}
          size={20}
        />
      </button>

      <button
        className={`${v.viewbutton} ${activeIndex === 3 ? v.active : ""}`}
        onClick={() => onClick(3)}
      >
        <FaGripHorizontal
          className={`${v.buttonIcon} ${activeIndex === 3 ? v.activeIcon : ""}`}
          size={20}
        />
      </button>

      <button
        className={`${v.viewbutton} ${activeIndex === 4 ? v.active : ""}`}
        onClick={() => onClick(4)}
      >
        <FaSquareFull
          className={`${v.buttonIcon} ${activeIndex === 4 ? v.activeIcon : ""}`}
          size={20}
        />
      </button>
    </div>
  );
}
//import Image from "next/image";
// import {
//   FaThLarge,
//   FaBars,
//   FaTh,
//   FaGripHorizontal,
//   FaSquareFull,
// } from "react-icons/fa";
// import v from "./view.module.css";
// export default function ViewButtons({ onClick }) {
//   return (
//     <div>
//       <button className={v.viewbutton} onClick={() => onClick(0)}>
//         {/*<Image
//           src="/icons/image1.png"
//           width={20}
//           height={20}
//           alt=""
//           className={v.buttonimage}
//           unoptimized={true} // Bypass Next.js optimization
//           priority={true}
//         />*/}
//         <FaThLarge className={v.buttonIcon} size={20} />
//       </button>

//       <button className={v.viewbutton} onClick={() => onClick(1)}>
//         {/* <Image
//           src="/icons/oneline.png"
//           width={10}
//           height={10}
//           alt=""
//           className={v.buttonimage}
//         /> */}
//         <FaBars className={v.buttonIcon} size={20} />
//       </button>

//       <button className={v.viewbutton} onClick={() => onClick(2)}>
//         {/* <Image
//           src="/icons/list.svg"
//           width={5}
//           height={5}
//           alt=""
//           className={v.buttonimage}
//         /> */}
//         <FaTh className={v.buttonIcon} size={20} />
//       </button>

//       <button className={v.viewbutton} onClick={() => onClick(3)}>
//         {/* <Image
//           src="/icons/image4.png"
//           width={10}
//           height={10}
//           alt=""
//           className={v.buttonimage}
//         /> */}
//         <FaGripHorizontal className={v.buttonIcon} size={20} />
//       </button>

//       <button className={v.viewbutton} onClick={() => onClick(4)}>
//         {/* <Image
//           src="/icons/image5.png"
//           width={10}
//           height={10}
//           alt=""
//           className={v.buttonimage}
//         /> */}
//         <FaSquareFull className={v.buttonIcon} size={20} />
//       </button>
//     </div>
//   );
// }
