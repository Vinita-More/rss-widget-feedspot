"use client";
import { useRouter } from "next/navigation";
import lb from "./logout.module.css";
export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/"); // Redirect to login page
  };

  return (
    <p onClick={handleLogout} className={lb.button}>
      🚪 Logout
    </p>
  );
}
