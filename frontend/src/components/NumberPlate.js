import React, { useState, useEffect } from "react";

const samplePlates = [
  "TN01AB1234",
  "KA05CD5678",
  "MH12EF9012",
  "DL08GH3456",
  "TS09IJ7890",
  "KL07KL2345",
  "WB06MN6789",
  "PB04OP0123",
];

const mockVehicles = [
  {
    plate: "TN01AB1234",
    type: "Car",
    owner: "Rajesh Kumar",
    status: "Authorized",
  },
  {
    plate: "KA05CD5678",
    type: "SUV",
    owner: "Priya Sharma",
    status: "Authorized",
  },
  {
    plate: "MH12EF9012",
    type: "Bike",
    owner: "Amit Patel",
    status: "Unauthorized",
  },
  {
    plate: "DL08GH3456",
    type: "Car",
    owner: "Sunita Singh",
    status: "Authorized",
  },
  {
    plate: "TS09IJ7890",
    type: "Car",
    owner: "Venkat Rao",
    status: "Authorized",
  },
];

export default function NumberPlate() {
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState(null);
  const [history, setHistory] = useState([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentPlate, setCurrentPlate] = useState("");
  const [camActive, setCamActive] = useState(false);

  useEffect(() => {
    if (scanning) {
      setScanProgress(0);
      setDetected(null);
      setCurrentPlate("");

      // Animate plate characters appearing
      const targetPlate =
        samplePlates[Math.floor(Math.random() * samplePlates.length)];
      let charIndex = 0;
      const charInterval = setInterval(() => {
        if (charIndex <= targetPlate.length) {
          setCurrentPlate(
            targetPlate.slice(0, charIndex) +
              (charIndex < targetPlate.length ? "_" : ""),
          );
          charIndex++;
        } else {
          clearInterval(charInterval);
        }
      }, 150);

      // Progress bar
      const progressInterval = setInterval(() => {
        setScanProgress((p) => {
          if (p >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return p + 2;
        });
      }, 50);

      // Show result after 3 seconds
      setTimeout(() => {
        const vehicle = mockVehicles.find((v) => v.plate === targetPlate) || {
          plate: targetPlate,
          type: "Car",
          owner: "Unknown",
          status: "Authorized",
        };
        setDetected(vehicle);
        setHistory((prev) => [
          { ...vehicle, time: new Date().toLocaleTimeString() },
          ...prev.slice(0, 9),
        ]);
        setScanning(false);
        setScanProgress(100);
      }, 3000);
    }
  }, [scanning]);

  return (
    <div style={{ color: "#fff", fontFamily: "'Segoe UI', sans-serif" }}>
      <style>{`
        @keyframes scanLine { 0%{top:0} 100%{top:100%} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes glitch { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-2px)} 75%{transform:translateX(2px)} }
      `}</style>

      <h2 style={{ color: "#00f0ff", marginBottom: "8px" }}>
        🔢 AI Number Plate Recognition
      </h2>
      <p style={{ color: "#888", marginBottom: "24px", fontSize: "14px" }}>
        Computer Vision based vehicle detection system
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        {/* Camera Feed Simulation */}
        <div
          style={{
            background: "rgba(0,240,255,0.03)",
            border: "1px solid rgba(0,240,255,0.3)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h3 style={{ color: "#00f0ff", fontSize: "14px", margin: 0 }}>
              📷 Camera Feed
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: camActive ? "#00ff88" : "#ff4444",
                  animation: camActive ? "blink 1s infinite" : "none",
                }}
              />
              <span
                style={{
                  color: camActive ? "#00ff88" : "#ff4444",
                  fontSize: "11px",
                }}
              >
                {camActive ? "LIVE" : "OFFLINE"}
              </span>
            </div>
          </div>

          {/* Camera View */}
          <div
            style={{
              background: "#000",
              borderRadius: "12px",
              height: "200px",
              position: "relative",
              overflow: "hidden",
              border: "2px solid rgba(0,240,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {camActive ? (
              <>
                {/* Grid overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "linear-gradient(rgba(0,240,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Scanning line */}
                {scanning && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      height: "2px",
                      background:
                        "linear-gradient(90deg, transparent, #00f0ff, transparent)",
                      animation: "scanLine 0.8s linear infinite",
                      boxShadow: "0 0 10px #00f0ff",
                    }}
                  />
                )}

                {/* Detection box */}
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div
                    style={{
                      border: `2px solid ${scanning ? "#ffd700" : detected ? "#00ff88" : "#00f0ff"}`,
                      borderRadius: "4px",
                      padding: "20px 40px",
                      position: "relative",
                      boxShadow: `0 0 20px ${scanning ? "#ffd700" : detected ? "#00ff88" : "#00f0ff"}44`,
                    }}
                  >
                    {/* Corner markers */}
                    {["topleft", "topright", "bottomleft", "bottomright"].map(
                      (pos) => (
                        <div
                          key={pos}
                          style={{
                            position: "absolute",
                            width: "12px",
                            height: "12px",
                            borderColor: "#00f0ff",
                            borderStyle: "solid",
                            borderWidth: pos.includes("top")
                              ? "2px 0 0"
                              : "0 0 2px",
                            ...(pos.includes("left")
                              ? { left: -2, borderRightWidth: "2px" }
                              : { right: -2, borderLeftWidth: "2px" }),
                            ...(pos.includes("top")
                              ? { top: -2 }
                              : { bottom: -2 }),
                          }}
                        />
                      ),
                    )}
                    <div
                      style={{
                        color: scanning
                          ? "#ffd700"
                          : detected
                            ? "#00ff88"
                            : "#888",
                        fontSize: "20px",
                        fontWeight: "bold",
                        letterSpacing: "4px",
                        fontFamily: "monospace",
                        animation: scanning ? "glitch 0.3s infinite" : "none",
                        minWidth: "160px",
                        textAlign: "center",
                      }}
                    >
                      {scanning
                        ? currentPlate || "_ _ _ _ _ _"
                        : detected
                          ? detected.plate
                          : "READY"}
                    </div>
                  </div>
                </div>

                {/* Corner HUD */}
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    color: "#00f0ff44",
                    fontSize: "10px",
                    fontFamily: "monospace",
                  }}
                >
                  CAM-01
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    color: "#00f0ff44",
                    fontSize: "10px",
                    fontFamily: "monospace",
                  }}
                >
                  {new Date().toLocaleTimeString()}
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", color: "#444" }}>
                <div style={{ fontSize: "48px", marginBottom: "8px" }}>📷</div>
                <div style={{ fontSize: "13px" }}>Camera Offline</div>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {scanning && (
            <div style={{ marginTop: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span style={{ color: "#ffd700", fontSize: "11px" }}>
                  🤖 AI Processing...
                </span>
                <span style={{ color: "#ffd700", fontSize: "11px" }}>
                  {scanProgress}%
                </span>
              </div>
              <div
                style={{
                  background: "#111",
                  borderRadius: "4px",
                  height: "6px",
                }}
              >
                <div
                  style={{
                    width: `${scanProgress}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #00f0ff, #7b2ff7)",
                    borderRadius: "4px",
                    transition: "width 0.1s",
                    boxShadow: "0 0 8px #00f0ff",
                  }}
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <button
              onClick={() => setCamActive(!camActive)}
              style={{
                flex: 1,
                padding: "10px",
                background: camActive
                  ? "rgba(255,68,68,0.1)"
                  : "rgba(0,255,136,0.1)",
                border: `1px solid ${camActive ? "#ff4444" : "#00ff88"}`,
                color: camActive ? "#ff4444" : "#00ff88",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              {camActive ? "⏹ Stop Camera" : "▶ Start Camera"}
            </button>
            <button
              onClick={() => camActive && !scanning && setScanning(true)}
              disabled={!camActive || scanning}
              style={{
                flex: 1,
                padding: "10px",
                background:
                  camActive && !scanning
                    ? "linear-gradient(90deg, #00f0ff, #7b2ff7)"
                    : "rgba(255,255,255,0.05)",
                border: "none",
                color: "#fff",
                borderRadius: "8px",
                cursor: camActive && !scanning ? "pointer" : "not-allowed",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {scanning ? "🔄 Scanning..." : "🔍 Detect Plate"}
            </button>
          </div>
        </div>

        {/* Detection Result */}
        <div
          style={{
            background: "rgba(123,47,247,0.03)",
            border: "1px solid rgba(123,47,247,0.3)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <h3
            style={{ color: "#7b2ff7", marginBottom: "16px", fontSize: "14px" }}
          >
            🎯 Detection Result
          </h3>

          {detected ? (
            <div>
              {/* Plate Display */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "20px",
                  textAlign: "center",
                  border: "3px solid #333",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    background: "#003580",
                    color: "#fff",
                    fontSize: "10px",
                    padding: "2px 8px",
                    borderRadius: "3px",
                    display: "inline-block",
                    marginBottom: "6px",
                  }}
                >
                  IND 🇮🇳
                </div>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#000",
                    letterSpacing: "4px",
                    fontFamily: "monospace",
                  }}
                >
                  {detected.plate}
                </div>
              </div>

              {/* Vehicle Info */}
              {[
                ["🚗 Vehicle Type", detected.type],
                ["👤 Owner", detected.owner],
                ["✅ Status", detected.status],
                ["⏰ Detected At", new Date().toLocaleTimeString()],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid #ffffff11",
                  }}
                >
                  <span style={{ color: "#888", fontSize: "13px" }}>
                    {label}
                  </span>
                  <span
                    style={{
                      color:
                        detected.status === "Unauthorized" &&
                        label.includes("Status")
                          ? "#ff4444"
                          : "#00ff88",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}

              <div
                style={{
                  marginTop: "16px",
                  padding: "12px",
                  background:
                    detected.status === "Authorized"
                      ? "rgba(0,255,136,0.1)"
                      : "rgba(255,68,68,0.1)",
                  borderRadius: "8px",
                  border: `1px solid ${detected.status === "Authorized" ? "#00ff88" : "#ff4444"}`,
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color:
                    detected.status === "Authorized" ? "#00ff88" : "#ff4444",
                }}
              >
                {detected.status === "Authorized"
                  ? "✅ ACCESS GRANTED — Welcome!"
                  : "❌ ACCESS DENIED — Alert Security!"}
              </div>
            </div>
          ) : (
            <div
              style={{ textAlign: "center", padding: "40px 0", color: "#444" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔍</div>
              <div>Start camera and detect a plate</div>
            </div>
          )}
        </div>
      </div>

      {/* Detection History */}
      <div
        style={{
          background: "rgba(0,240,255,0.03)",
          border: "1px solid rgba(0,240,255,0.2)",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <h3
          style={{ color: "#00f0ff", marginBottom: "16px", fontSize: "14px" }}
        >
          📋 Recent Detections
        </h3>
        {history.length === 0 ? (
          <div style={{ color: "#444", textAlign: "center", padding: "20px" }}>
            No detections yet
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "12px",
            }}
          >
            {history.map((h, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: "8px",
                  padding: "12px",
                  border: `1px solid ${h.status === "Authorized" ? "#00ff8844" : "#ff444444"}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#fff",
                    marginBottom: "4px",
                  }}
                >
                  {h.plate}
                </div>
                <div style={{ color: "#888", fontSize: "11px" }}>
                  {h.type} • {h.time}
                </div>
                <div
                  style={{
                    color: h.status === "Authorized" ? "#00ff88" : "#ff4444",
                    fontSize: "11px",
                    marginTop: "4px",
                  }}
                >
                  {h.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
