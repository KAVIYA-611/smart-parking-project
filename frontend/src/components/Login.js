import React, { useState, useEffect } from "react";
import { loginUser, registerUser } from "../api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((d) => (d.length >= 3 ? "" : d + "."));
      }, 400);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      let res;
      if (isRegister) {
        res = await registerUser({ name, email, password });
      } else {
        res = await loginUser({ email, password });
      }
      setTimeout(() => onLogin(res.data.user), 1000);
    } catch (err) {
      setError("Invalid credentials! Try again.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050510",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background orbs */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)",
          top: "-100px",
          left: "-100px",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(123,47,247,0.1) 0%, transparent 70%)",
          bottom: "-50px",
          right: "-50px",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(0,240,255,0.3)} 50%{box-shadow:0 0 40px rgba(0,240,255,0.6)} }
        @keyframes scan { 0%{top:0} 100%{top:100%} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(0,240,255,0.3)",
          borderRadius: "20px",
          padding: "48px 40px",
          width: "400px",
          backdropFilter: "blur(20px)",
          animation: "glow 3s infinite, fadeIn 0.5s ease",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Scanning line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #00f0ff, transparent)",
            animation: "scan 3s linear infinite",
            opacity: 0.5,
          }}
        />

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "48px", marginBottom: "8px" }}>🅿️</div>
          <h1
            style={{
              background: "linear-gradient(90deg, #00f0ff, #7b2ff7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "22px",
              fontWeight: "bold",
              margin: "0 0 8px",
            }}
          >
            AI Smart Parking India
          </h1>
          <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>
            Smart Co-operative Parking System
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div
              style={{
                fontSize: "40px",
                marginBottom: "16px",
                animation: "float 1s infinite",
              }}
            >
              🤖
            </div>
            <div
              style={{ color: "#00f0ff", fontSize: "18px", fontWeight: "bold" }}
            >
              AUTHENTICATING{dots}
            </div>
            <div style={{ color: "#888", fontSize: "13px", marginTop: "8px" }}>
              AI System Verification
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                marginTop: "20px",
              }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#00f0ff",
                    animation: `float ${0.5 + i * 0.1}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            {isRegister && (
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    color: "#888",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  FULL NAME
                </label>
                <input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(0,240,255,0.3)",
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
              </div>
            )}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  color: "#888",
                  fontSize: "12px",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                EMAIL
              </label>
              <input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(0,240,255,0.3)",
                  borderRadius: "10px",
                  color: "#fff",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  color: "#888",
                  fontSize: "12px",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                PASSWORD
              </label>
              <input
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(0,240,255,0.3)",
                  borderRadius: "10px",
                  color: "#fff",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>
            {error && (
              <div
                style={{
                  color: "#ff4444",
                  textAlign: "center",
                  marginBottom: "16px",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}
            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                padding: "14px",
                background: "linear-gradient(90deg, #00f0ff, #7b2ff7)",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                letterSpacing: "1px",
              }}
            >
              {isRegister ? "🚀 REGISTER" : "🔐 LOGIN"}
            </button>
            <p
              onClick={() => setIsRegister(!isRegister)}
              style={{
                color: "#00f0ff",
                textAlign: "center",
                marginTop: "20px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {isRegister
                ? "Already have account? Login →"
                : "Don't have account? Register →"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
