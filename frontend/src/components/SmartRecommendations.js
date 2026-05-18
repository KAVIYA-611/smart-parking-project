/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

const locations = [
  {
    name: "Phoenix MarketCity",
    city: "Chennai",
    type: "Mall",
    available: 230,
    total: 500,
    rating: 4.5,
    distance: "2.3 km",
    time: "8 mins",
    traffic: "low",
    price: 50,
  },
  {
    name: "Apollo Hospital",
    city: "Chennai",
    type: "Hospital",
    available: 45,
    total: 300,
    rating: 4.6,
    distance: "1.1 km",
    time: "5 mins",
    traffic: "low",
    price: 30,
  },
  {
    name: "Express Avenue",
    city: "Chennai",
    type: "Mall",
    available: 180,
    total: 400,
    rating: 4.2,
    distance: "3.5 km",
    time: "12 mins",
    traffic: "moderate",
    price: 50,
  },
  {
    name: "Chennai Airport",
    city: "Chennai",
    type: "Airport",
    available: 450,
    total: 1000,
    rating: 4.4,
    distance: "15 km",
    time: "35 mins",
    traffic: "high",
    price: 100,
  },
  {
    name: "Orion Mall",
    city: "Bangalore",
    type: "Mall",
    available: 310,
    total: 600,
    rating: 4.6,
    distance: "5.2 km",
    time: "18 mins",
    traffic: "moderate",
    price: 60,
  },
  {
    name: "Lulu Mall",
    city: "Kochi",
    type: "Mall",
    available: 420,
    total: 800,
    rating: 4.8,
    distance: "4.1 km",
    time: "15 mins",
    traffic: "low",
    price: 40,
  },
  {
    name: "DLF Mall",
    city: "Delhi",
    type: "Mall",
    available: 350,
    total: 700,
    rating: 4.4,
    distance: "7.8 km",
    time: "28 mins",
    traffic: "high",
    price: 80,
  },
  {
    name: "Palladium Mall",
    city: "Mumbai",
    type: "Mall",
    available: 280,
    total: 550,
    rating: 4.7,
    distance: "6.3 km",
    time: "22 mins",
    traffic: "moderate",
    price: 100,
  },
];

const typeIcons = {
  Mall: "🏬",
  Hospital: "🏥",
  Airport: "✈️",
  Railway: "🚂",
  Tourist: "🏛️",
};
const typeColors = {
  Mall: "#00f0ff",
  Hospital: "#00ff88",
  Airport: "#7b2ff7",
  Railway: "#ffd700",
  Tourist: "#ff6b35",
};
const trafficColors = { low: "#00ff88", moderate: "#ffd700", high: "#ff4444" };

function AIScore({ location }) {
  const availPct = (location.available / location.total) * 100;
  const trafficScore =
    location.traffic === "low"
      ? 100
      : location.traffic === "moderate"
        ? 60
        : 20;
  const score = Math.round(
    availPct * 0.4 + location.rating * 10 * 0.3 + trafficScore * 0.3,
  );
  const color = score > 70 ? "#00ff88" : score > 40 ? "#ffd700" : "#ff4444";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          flex: 1,
          background: "#111",
          borderRadius: "6px",
          height: "6px",
        }}
      >
        <div
          style={{
            width: `${score}%`,
            height: "100%",
            background: color,
            borderRadius: "6px",
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      </div>
      <span
        style={{
          color,
          fontWeight: "bold",
          fontSize: "13px",
          minWidth: "35px",
        }}
      >
        {score}
      </span>
    </div>
  );
}

export default function SmartRecommendations({ user }) {
  const [preference, setPreference] = useState("nearest");
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [purpose, setPurpose] = useState("shopping");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    generateRecommendations();
  }, [preference, timeOfDay, purpose]);

  const generateRecommendations = () => {
    setLoading(true);
    let d = "";
    const interval = setInterval(() => {
      d = d.length >= 3 ? "" : d + ".";
      setDots(d);
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      let scored = locations.map((loc) => {
        let score = 0;
        const availPct = (loc.available / loc.total) * 100;

        if (preference === "nearest")
          score += (20 - parseFloat(loc.distance)) * 3;
        if (preference === "cheapest") score += 150 - loc.price;
        if (preference === "available") score += availPct;
        if (preference === "rating") score += loc.rating * 20;

        if (timeOfDay === "morning" && loc.traffic === "low") score += 20;
        if (timeOfDay === "evening" && loc.traffic !== "high") score += 15;
        if (timeOfDay === "night" && loc.available > 200) score += 25;

        if (purpose === "shopping" && loc.type === "Mall") score += 30;
        if (purpose === "medical" && loc.type === "Hospital") score += 40;
        if (purpose === "travel" && loc.type === "Airport") score += 40;

        score += loc.rating * 5;
        score += availPct * 0.3;

        return { ...loc, aiScore: Math.min(100, Math.round(score)) };
      });

      scored.sort((a, b) => b.aiScore - a.aiScore);
      setRecommendations(scored.slice(0, 6));
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ color: "#fff", fontFamily: "'Segoe UI', sans-serif" }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>

      <h2 style={{ color: "#00f0ff", marginBottom: "4px" }}>
        🎯 Smart Recommendations
      </h2>
      <p style={{ color: "#888", marginBottom: "24px", fontSize: "14px" }}>
        AI-powered parking suggestions based on your preferences
      </p>

      {/* AI Brain Animation */}
      <div
        style={{
          background: "rgba(123,47,247,0.05)",
          border: "1px solid rgba(123,47,247,0.3)",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: "32px", animation: "pulse 2s infinite" }}>
            🤖
          </div>
          <div>
            <div
              style={{ color: "#7b2ff7", fontWeight: "bold", fontSize: "15px" }}
            >
              AI Recommendation Engine
            </div>
            <div style={{ color: "#888", fontSize: "12px" }}>
              Analyzing 40+ parking locations • Real-time data
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#00ff88",
                animation: "pulse 1s infinite",
              }}
            />
            <span style={{ color: "#00ff88", fontSize: "12px" }}>Live</span>
          </div>
        </div>

        {/* Preferences */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          <div>
            <label
              style={{
                color: "#888",
                fontSize: "11px",
                display: "block",
                marginBottom: "8px",
              }}
            >
              🎯 PREFERENCE
            </label>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              {[
                { id: "nearest", icon: "📍", label: "Nearest" },
                { id: "cheapest", icon: "💰", label: "Cheapest" },
                { id: "available", icon: "🟢", label: "Most Available" },
                { id: "rating", icon: "⭐", label: "Best Rated" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPreference(p.id)}
                  style={{
                    padding: "8px 12px",
                    background:
                      preference === p.id
                        ? "rgba(0,240,255,0.15)"
                        : "rgba(0,0,0,0.3)",
                    border: `1px solid ${preference === p.id ? "#00f0ff" : "#333"}`,
                    color: preference === p.id ? "#00f0ff" : "#888",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "12px",
                    textAlign: "left",
                    fontWeight: preference === p.id ? "bold" : "normal",
                  }}
                >
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              style={{
                color: "#888",
                fontSize: "11px",
                display: "block",
                marginBottom: "8px",
              }}
            >
              ⏰ TIME OF DAY
            </label>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              {[
                { id: "morning", icon: "🌅", label: "Morning 6-12" },
                { id: "afternoon", icon: "☀️", label: "Afternoon 12-6" },
                { id: "evening", icon: "🌆", label: "Evening 6-10" },
                { id: "night", icon: "🌙", label: "Night 10-6" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTimeOfDay(t.id)}
                  style={{
                    padding: "8px 12px",
                    background:
                      timeOfDay === t.id
                        ? "rgba(123,47,247,0.15)"
                        : "rgba(0,0,0,0.3)",
                    border: `1px solid ${timeOfDay === t.id ? "#7b2ff7" : "#333"}`,
                    color: timeOfDay === t.id ? "#7b2ff7" : "#888",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "12px",
                    textAlign: "left",
                    fontWeight: timeOfDay === t.id ? "bold" : "normal",
                  }}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              style={{
                color: "#888",
                fontSize: "11px",
                display: "block",
                marginBottom: "8px",
              }}
            >
              🎪 PURPOSE
            </label>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              {[
                { id: "shopping", icon: "🛍️", label: "Shopping" },
                { id: "medical", icon: "🏥", label: "Medical" },
                { id: "travel", icon: "✈️", label: "Travel" },
                { id: "general", icon: "🎯", label: "General" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPurpose(p.id)}
                  style={{
                    padding: "8px 12px",
                    background:
                      purpose === p.id
                        ? "rgba(255,215,0,0.15)"
                        : "rgba(0,0,0,0.3)",
                    border: `1px solid ${purpose === p.id ? "#ffd700" : "#333"}`,
                    color: purpose === p.id ? "#ffd700" : "#888",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "12px",
                    textAlign: "left",
                    fontWeight: purpose === p.id ? "bold" : "normal",
                  }}
                >
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "48px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "3px solid rgba(0,240,255,0.2)",
              borderTop: "3px solid #00f0ff",
              borderRadius: "50%",
              margin: "0 auto 16px",
              animation: "spin 1s linear infinite",
            }}
          />
          <div
            style={{ color: "#00f0ff", fontSize: "16px", fontWeight: "bold" }}
          >
            AI Analyzing{dots}
          </div>
          <div style={{ color: "#888", fontSize: "13px", marginTop: "8px" }}>
            Processing 40+ locations...
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h3 style={{ color: "#00f0ff", margin: 0, fontSize: "16px" }}>
              🏆 Top Recommendations
            </h3>
            <button
              onClick={generateRecommendations}
              style={{
                background: "rgba(0,240,255,0.1)",
                border: "1px solid rgba(0,240,255,0.3)",
                color: "#00f0ff",
                padding: "6px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              🔄 Refresh
            </button>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {recommendations.map((loc, i) => {
              const availPct = Math.round((loc.available / loc.total) * 100);
              const color = typeColors[loc.type] || "#00f0ff";
              return (
                <div
                  key={i}
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    border: `1px solid ${i === 0 ? "#ffd700" : color + "44"}`,
                    borderRadius: "16px",
                    padding: "18px",
                    animation: "fadeIn 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Rank Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background:
                        i === 0
                          ? "linear-gradient(135deg, #ffd700, #ff6b35)"
                          : i === 1
                            ? "linear-gradient(135deg, #888, #555)"
                            : i === 2
                              ? "linear-gradient(135deg, #cd7f32, #8b4513)"
                              : "rgba(0,240,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: i < 3 ? "16px" : "12px",
                      fontWeight: "bold",
                      color: i < 3 ? "#000" : "#00f0ff",
                      boxShadow:
                        i === 0 ? "0 0 12px rgba(255,215,0,0.5)" : "none",
                    }}
                  >
                    {i === 0
                      ? "🥇"
                      : i === 1
                        ? "🥈"
                        : i === 2
                          ? "🥉"
                          : `#${i + 1}`}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                      paddingRight: "40px",
                    }}
                  >
                    <span style={{ fontSize: "28px" }}>
                      {typeIcons[loc.type]}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                          marginBottom: "4px",
                          flexWrap: "wrap",
                        }}
                      >
                        <h3
                          style={{ color: "#fff", margin: 0, fontSize: "15px" }}
                        >
                          {loc.name}
                        </h3>
                        <span
                          style={{
                            background: `${color}22`,
                            border: `1px solid ${color}`,
                            color,
                            borderRadius: "8px",
                            padding: "1px 8px",
                            fontSize: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {loc.type}
                        </span>
                      </div>
                      <div
                        style={{
                          color: "#888",
                          fontSize: "12px",
                          marginBottom: "12px",
                        }}
                      >
                        📍 {loc.city}
                      </div>

                      {/* Stats Grid */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(4, 1fr)",
                          gap: "8px",
                          marginBottom: "12px",
                        }}
                      >
                        {[
                          {
                            icon: "📏",
                            label: "Distance",
                            value: loc.distance,
                          },
                          { icon: "⏱️", label: "ETA", value: loc.time },
                          {
                            icon: "💰",
                            label: "Price/hr",
                            value: `₹${loc.price}`,
                          },
                          { icon: "⭐", label: "Rating", value: loc.rating },
                        ].map((s, j) => (
                          <div
                            key={j}
                            style={{
                              background: "rgba(255,255,255,0.03)",
                              borderRadius: "8px",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            <div style={{ fontSize: "14px" }}>{s.icon}</div>
                            <div
                              style={{
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "12px",
                                margin: "2px 0",
                              }}
                            >
                              {s.value}
                            </div>
                            <div style={{ color: "#666", fontSize: "9px" }}>
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Availability */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "12px",
                          marginBottom: "6px",
                        }}
                      >
                        <span style={{ color: "#0f0" }}>
                          ✅ {loc.available} Free
                        </span>
                        <span style={{ color: trafficColors[loc.traffic] }}>
                          🚦 {loc.traffic} traffic
                        </span>
                        <span style={{ color: "#888" }}>
                          {availPct}% available
                        </span>
                      </div>
                      <div
                        style={{
                          background: "#111",
                          borderRadius: "4px",
                          height: "5px",
                          marginBottom: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: `${availPct}%`,
                            height: "100%",
                            background: availPct > 50 ? "#0f0" : "#ff0",
                            borderRadius: "4px",
                          }}
                        />
                      </div>

                      {/* AI Score */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#888",
                            fontSize: "11px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          🤖 AI Score:
                        </span>
                        <AIScore location={loc} />
                        <span
                          style={{
                            color: "#00ff88",
                            fontSize: "11px",
                            fontWeight: "bold",
                          }}
                        >
                          {loc.aiScore}/100
                        </span>
                      </div>

                      {i === 0 && (
                        <div
                          style={{
                            marginTop: "10px",
                            padding: "8px 12px",
                            background: "rgba(255,215,0,0.1)",
                            border: "1px solid rgba(255,215,0,0.3)",
                            borderRadius: "8px",
                            color: "#ffd700",
                            fontSize: "12px",
                          }}
                        >
                          ⭐ AI Top Pick — Best match for your preferences!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
