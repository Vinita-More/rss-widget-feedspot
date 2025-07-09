"use client";
import { useState } from "react";
import Link from "next/link";
import s from "./signup.module.css";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignup = async () => {
    setError("");
    setMessage("");

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:8080/RSS_Widget_Backend/api/signup.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (data.success) {
        router.push("/");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Server error");
      console.error(err);
    }
  };

  return (
    <div className={s.signupWrapper}>
      <div className={s.signupBox}>
        <h1>Welcome To Feedspot</h1>

        <div className={s.inputGroup}>
          <label>Enter Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={s.inputGroup}>
          <label>Enter Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            maxLength={20}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={s.inputGroup}>
          <label>Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            maxLength={20}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className={s.toggleWrapper}>
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>

        {error && <p className={s.error}>{error}</p>}
        {message && <p className={s.success}>{message}</p>}

        <button className={s.signupButton} onClick={handleSignup}>
          Signup
        </button>

        <p className={s.loginText}>
          Already have an account?{" "}
          <span>
            <Link href="/">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
