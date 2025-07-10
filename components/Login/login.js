"use client";
import { useState } from "react";
import Link from "next/link";
import l from "./login.module.css";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(regex.test(value) ? "" : "Invalid email format");
  };

  const validatePassword = (value) => {
    setPasswordError(
      value.length >= 6 ? "" : "Password must be at least 6 characters"
    );
  };

  const handleLogin = async () => {
    validateEmail(email);
    validatePassword(password);

    const res = await fetch(
      "http://localhost:8080/RSS_Widget_Backend/api/login.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const result = await res.json();

    if (result.success) {
      localStorage.setItem("token", result.token);
      router.push("/widget"); // Navigate to protected page
    } else {
      alert(result.message || "Login failed");
    }
  };

  return (
    <div className={l.loginWrapper}>
      <div className={l.loginBox}>
        <h1 className={l.title}>Login</h1>

        <div className={l.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              {
                /*validateEmail(e.target.value);*/
              }
            }}
          />
          {emailError && <p className={l.error}>{emailError}</p>}
        </div>

        <div className={l.inputGroup}>
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            maxLength={20}
            onChange={(e) => {
              setPassword(e.target.value);
              {
                /* validatePassword(e.target.value); */
              }
            }}
          />
          {passwordError && <p className={l.error}>{passwordError}</p>}
        </div>
        <div className={l.toggleWrapper}>
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>
        <button className={l.loginButton} onClick={handleLogin}>
          Login
        </button>

        {serverMessage && <p className={l.serverMessage}>{serverMessage}</p>}

        <p className={l.signupText}>
          Don't have an account?{" "}
          <Link href="/signup" className={l.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

// const handleLogin = async () => {
//   // check before submitting
//   validateEmail(email);
//   validatePassword(password);

//   if (emailError || passwordError || !email || !password) return;

//   try {
//     const res = await fetch(
//       "http://localhost:8080/RSS_Widget_Backend/api/login.php",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       }
//     );

//     const result = await res.json();
//     setServerMessage(result.message);

//     if (result.success) {
//       localStorage.setItem("userEmail", email);
//       // success actions, e.g., redirect
//       router.push("/widget");
//     }
//   } catch (error) {
//     setServerMessage("Server error. Try again.");
//     console.error(error);
//   }
// };
