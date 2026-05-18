import React, { useState, useEffect } from "react";

const mallLocations = {
  chennai: [
    {
      name: "Phoenix MarketCity",
      address: "Velachery, Chennai",
      distance: "5.2 km",
      time: "18 mins",
      traffic: "moderate",
      lat: 12.9816,
      lng: 80.2209,
    },
    {
      name: "Express Avenue",
      address: "Royapettah, Chennai",
      distance: "3.1 km",
      time: "12 mins",
      traffic: "low",
      lat: 13.0524,
      lng: 80.2574,
    },
    {
      name: "VR Mall",
      address: "Anna Nagar, Chennai",
      distance: "7.4 km",
      time: "25 mins",
      traffic: "high",
      lat: 13.0878,
      lng: 80.2108,
    },
  ],
  bangalore: [
    {
      name: "Orion Mall",
      address: "Rajajinagar, Bangalore",
      distance: "8.1 km",
      time: "30 mins",
      traffic: "high",
      lat: 12.9915,
      lng: 77.5554,
    },
    {
      name: "Forum Mall",
      address: "Koramangala, Bangalore",
      distance: "6.3 km",
      time: "22 mins",
      traffic: "moderate",
      lat: 12.9344,
      lng: 77.6101,
    },
  ],
  mumbai: [
    {
      name: "Palladium Mall",
      address: "Lower Parel, Mumbai",
      distance: "4.5 km",
      time: "20 mins",
      traffic: "high",
      lat: 18.9969,
      lng: 72.8265,
    },
    {
      name: "R City Mall",
      address: "Ghatkopar, Mumbai",
      distance: "9.2 km",
      time: "35 mins",
      traffic: "moderate",
      lat: 19.0866,
      lng: 72.9086,
    },
  ],
  delhi: [
    {
      name: "DLF Mall",
      address: "Saket, Delhi",
      distance: "6.8 km",
      time: "28 mins",
      traffic: "high",
      lat: 28.5244,
      lng: 77.2066,
    },
    {
      name: "Select Citywalk",
      address: "Saket, Delhi",
      distance: "6.5 km",
      time: "26 mins",
      traffic: "moderate",
      lat: 28.5272,
      lng: 77.2192,
    },
  ],
  hyderabad: [
    {
      name: "Inorbit Mall",
      address: "Madhapur, Hyderabad",
      distance: "7.1 km",
      time: "24 mins",
      traffic: "low",
      lat: 17.4344,
      lng: 78.3828,
    },
    {
      name: "GVK One",
      address: "Banjara Hills, Hyderabad",
      distance: "4.9 km",
      time: "18 mins",
      traffic: "moderate",
      lat: 17.4156,
      lng: 78.4347,
    },
  ],
};

const trafficColors = { low: "#00ff88", moderate: "#ffd700", high: "#ff4444" };
const trafficLabels = {
  low: "🟢 Low Traffic",
  moderate: "🟡 Moderate",
  high: "🔴 Heavy Traffic",
};

function RouteMap({ mall }) {
  const [animStep, setAnimStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimStep((s) => (s + 1) % 10);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const color = trafficColors[mall.traffic];

  return (
    <svg
      width="100%"
      height="160"
      style={{
        background: "#050510",
        borderRadius: "12px",
        border: "1px solid rgba(0,240,255,0.2)",
      }}
    >
      {/* Grid */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="rgba(0,240,255,0.05)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Road */}
      <path
        d="M 40 80 Q 150 40 260 80 Q 350 110 440 80"
        fill="none"
        stroke="#333"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M 40 80 Q 150 40 260 80 Q 350 110 440 80"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="8 4"
        opacity="0.8"
      />

      {/* Animated car */}
      <circle
        cx={40 + animStep * 40}
        cy={80}
        r="6"
        fill="#00f0ff"
        style={{ filter: "drop-shadow(0 0 6px #00f0ff)" }}
      />
      <circle
        cx={40 + animStep * 40}
        cy={80}
        r="10"
        fill="none"
        stroke="#00f0ff"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Start point */}
      <circle
        cx="40"
        cy="80"
        r="8"
        fill="#7b2ff7"
        style={{ filter: "drop-shadow(0 0 6px #7b2ff7)" }}
      />
      <text x="40" y="110" fill="#7b2ff7" fontSize="10" textAnchor="middle">
        You
      </text>

      {/* End point - Mall */}
      <circle
        cx="440"
        cy="80"
        r="10"
        fill={color}
        style={{ filter: `drop-shadow(0 0 8px ${color})` }}
      />
      <text x="440" y="110" fill={color} fontSize="9" textAnchor="middle">
        Mall
      </text>

      {/* Distance markers */}
      {[1, 2, 3].map((i) => (
        <g key={i}>
          <circle
            cx={40 + i * 100}
            cy={80}
            r="3"
            fill="#333"
            stroke="#555"
            strokeWidth="1"
          />
        </g>
      ))}

      {/* Traffic indicator */}
      <rect
        x="150"
        y="20"
        width="140"
        height="28"
        rx="6"
        fill="rgba(0,0,0,0.6)"
        stroke={color}
        strokeWidth="1"
      />
      <text x="220" y="38" fill={color} fontSize="11" textAnchor="middle">
        {trafficLabels[mall.traffic]}
      </text>
    </svg>
  );
}

export default function TrafficRoute() {
  const [selectedCity, setSelectedCity] = useState("chennai");
  const [selectedMall, setSelectedMall] = useState(null);
  const [userLocation, setUserLocation] = useState("Detecting...");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setTimeout(() => setUserLocation("Your Location (GPS Active)"), 1500);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const malls = mallLocations[selectedCity] || [];

  return (
    <div style={{ color: "#fff", fontFamily: "'Segoe UI', sans-serif" }}>
      <style>{`
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes ping { 0%{transform:scale(1);opacity:1} 100%{transform:scale(2);opacity:0} }
      `}</style>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h2 style={{ color: "#00f0ff", margin: "0 0 4px" }}>
            📍 Live Traffic & Route to Mall
          </h2>
          <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>
            AI-powered real-time navigation
          </p>
        </div>
        <button
          onClick={handleRefresh}
          style={{
            background: "rgba(0,240,255,0.1)",
            border: "1px solid rgba(0,240,255,0.3)",
            color: "#00f0ff",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              animation: refreshing ? "spin 1s linear infinite" : "none",
            }}
          >
            🔄
          </span>
          {refreshing ? "Updating..." : "Refresh"}
        </button>
      </div>

      {/* User Location */}
      <div
        style={{
          background: "rgba(123,47,247,0.08)",
          border: "1px solid rgba(123,47,247,0.3)",
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#7b2ff7",
              animation: "pulse 1s infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#7b2ff7",
              animation: "ping 1.5s infinite",
              opacity: 0.5,
            }}
          />
        </div>
        <div>
          <div
            style={{ color: "#7b2ff7", fontWeight: "bold", fontSize: "13px" }}
          >
            📡 GPS Location
          </div>
          <div style={{ color: "#aaa", fontSize: "13px" }}>{userLocation}</div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            color: "#00ff88",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#00ff88",
              animation: "pulse 1s infinite",
            }}
          />
          Live
        </div>
      </div>

      {/* City Selector */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {Object.keys(mallLocations).map((city) => (
          <button
            key={city}
            onClick={() => {
              setSelectedCity(city);
              setSelectedMall(null);
            }}
            style={{
              padding: "8px 18px",
              background: selectedCity === city ? "#00f0ff" : "transparent",
              border: "1px solid rgba(0,240,255,0.3)",
              color: selectedCity === city ? "#000" : "#00f0ff",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: selectedCity === city ? "bold" : "normal",
              textTransform: "capitalize",
            }}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Traffic Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        {[
          {
            label: "Low Traffic",
            count: malls.filter((m) => m.traffic === "low").length,
            color: "#00ff88",
            icon: "🟢",
          },
          {
            label: "Moderate",
            count: malls.filter((m) => m.traffic === "moderate").length,
            color: "#ffd700",
            icon: "🟡",
          },
          {
            label: "Heavy",
            count: malls.filter((m) => m.traffic === "high").length,
            color: "#ff4444",
            icon: "🔴",
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: `rgba(0,0,0,0.3)`,
              border: `1px solid ${s.color}33`,
              borderRadius: "12px",
              padding: "14px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "20px" }}>{s.icon}</div>
            <div
              style={{ fontSize: "22px", fontWeight: "bold", color: s.color }}
            >
              {s.count}
            </div>
            <div style={{ color: "#888", fontSize: "11px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Mall Route Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {malls.map((mall, i) => (
          <div
            key={i}
            style={{
              background: "rgba(0,240,255,0.03)",
              border: `1px solid ${selectedMall?.name === mall.name ? "#00f0ff" : "rgba(0,240,255,0.2)"}`,
              borderRadius: "16px",
              padding: "20px",
              cursor: "pointer",
              transition: "all 0.3s",
              boxShadow:
                selectedMall?.name === mall.name
                  ? "0 0 20px rgba(0,240,255,0.2)"
                  : "none",
            }}
            onClick={() =>
              setSelectedMall(selectedMall?.name === mall.name ? null : mall)
            }
          >
            {/* Mall Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "16px",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <div>
                <h3
                  style={{
                    color: "#00f0ff",
                    margin: "0 0 4px",
                    fontSize: "16px",
                  }}
                >
                  🏬 {mall.name}
                </h3>
                <div style={{ color: "#888", fontSize: "13px" }}>
                  📍 {mall.address}
                </div>
              </div>
              <div
                style={{
                  padding: "6px 12px",
                  background: `${trafficColors[mall.traffic]}22`,
                  border: `1px solid ${trafficColors[mall.traffic]}`,
                  borderRadius: "20px",
                  fontSize: "12px",
                  color: trafficColors[mall.traffic],
                  fontWeight: "bold",
                }}
              >
                {trafficLabels[mall.traffic]}
              </div>
            </div>

            {/* Route Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              {[
                { icon: "📏", label: "Distance", value: mall.distance },
                { icon: "⏱️", label: "ETA", value: mall.time },
                {
                  icon: "🚦",
                  label: "Traffic",
                  value:
                    mall.traffic.charAt(0).toUpperCase() +
                    mall.traffic.slice(1),
                },
              ].map((stat, j) => (
                <div
                  key={j}
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    borderRadius: "10px",
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "20px", marginBottom: "4px" }}>
                    {stat.icon}
                  </div>
                  <div
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ color: "#888", fontSize: "11px" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Route Map */}
            {selectedMall?.name === mall.name && (
              <div>
                <RouteMap mall={mall} />
                <div
                  style={{ display: "flex", gap: "12px", marginTop: "16px" }}
                >
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${mall.lat},${mall.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: "linear-gradient(90deg, #00f0ff, #7b2ff7)",
                      border: "none",
                      borderRadius: "10px",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      textDecoration: "none",
                      textAlign: "center",
                      display: "block",
                    }}
                  >
                    🗺️ Open in Google Maps
                  </a>
                  <button
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: "rgba(0,255,136,0.1)",
                      border: "1px solid #00ff88",
                      borderRadius: "10px",
                      color: "#00ff88",
                      fontSize: "14px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    🧭 Start Navigation
                  </button>
                </div>
              </div>
            )}

            {selectedMall?.name !== mall.name && (
              <div
                style={{
                  color: "#00f0ff44",
                  fontSize: "12px",
                  textAlign: "center",
                }}
              >
                Click to view route map →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
