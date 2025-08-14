import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`http://localhost:4000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
                localStorage.setItem("user", JSON.stringify(data.user));
        
        onLoginSuccess();
        setError(data.message || "Invalid username or password");
      }
    } catch {
       return setError("Network error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left"><img src="/assets/fitness.png" alt="Fitness Illustration" /></div>
      <div className="login-right">
        <img src="/assets/logo.png" alt="Crystal Delta Logo" className="logo" />
        <h2>Welcome Back!</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p className="register-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}