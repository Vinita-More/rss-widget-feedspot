import Image from "next/image";
import v from "./view.module.css";
export default function ViewButtons({ onClick }) {
  return (
    <div>
      <button className={v.viewbutton} onClick={() => onClick(0)}>
        <Image
          src="/icons/image1.png"
          width={10}
          height={10}
          alt=""
          className={v.buttonimage}
        />
      </button>

      <button className={v.viewbutton} onClick={() => onClick(1)}>
        <Image
          src="/icons/oneline.png"
          width={10}
          height={10}
          alt=""
          className={v.buttonimage}
        />
      </button>

      <button className={v.viewbutton} onClick={() => onClick(2)}>
        <Image
          src="/icons/list.svg"
          width={5}
          height={5}
          alt=""
          className={v.buttonimage}
        />
      </button>

      <button className={v.viewbutton} onClick={() => onClick(3)}>
        <Image
          src="/icons/image4.png"
          width={10}
          height={10}
          alt=""
          className={v.buttonimage}
        />
      </button>

      <button className={v.viewbutton} onClick={() => onClick(4)}>
        <Image
          src="/icons/image5.png"
          width={10}
          height={10}
          alt=""
          className={v.buttonimage}
        />
      </button>
    </div>
  );
}
