//import Image from "next/image";
//import styles from "./page.module.css";
import Login from "@/components/Login/login";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* <Link href="/widget">Rss Widget</Link> */}
      <Login />
    </div>
  );
}
