import React, { useState, useEffect } from "react";

const newsData = [
  {
    id: 1,
    category: "AI Update",
    icon: "🤖",
    color: "#00f0ff",
    title: "AI Parking System Reduces Search Time by 60%",
    summary:
      "New machine learning model deployed across Chennai malls shows significant improvement in parking slot prediction accuracy.",
    city: "Chennai",
    time: "2 hours ago",
    trending: true,
    tags: ["AI", "ML", "Chennai"],
  },
  {
    id: 2,
    category: "New Location",
    icon: "📍",
    color: "#00ff88",
    title: "Lulu Mall Kochi Expands Parking to 1000 Slots",
    summary:
      "Kochi's largest mall adds 200 new smart parking slots with IoT sensors and real-time monitoring.",
    city: "Kochi",
    time: "5 hours ago",
    trending: true,
    tags: ["Expansion", "IoT", "Kochi"],
  },
  {
    id: 3,
    category: "Traffic Alert",
    icon: "🚦",
    color: "#ffd700",
    title: "Heavy Traffic Expected Near DLF Mall This Weekend",
    summary:
      "AI prediction models forecast 85% occupancy at Delhi malls this Saturday due to festive season.",
    city: "Delhi",
    time: "8 hours ago",
    trending: false,
    tags: ["Traffic", "Alert", "Delhi"],
  },
  {
    id: 4,
    category: "Technology",
    icon: "💡",
    color: "#7b2ff7",
    title: "Computer Vision System Detects Plates in 0.3 Seconds",
    summary:
      "New GPU-accelerated number plate recognition deployed at Mumbai airports achieving 99.2% accuracy.",
    city: "Mumbai",
    time: "1 day ago",
    trending: true,
    tags: ["CV", "Technology", "Mumbai"],
  },
  {
    id: 5,
    category: "Policy",
    icon: "📋",
    color: "#ff6b35",
    title: "Smart Parking Made Mandatory for New Malls in India",
    summary:
      "Government announces new regulations requiring IoT-based parking management for all commercial complexes above 50,000 sq ft.",
    city: "National",
    time: "2 days ago",
    trending: false,
    tags: ["Policy", "Government", "National"],
  },
  {
    id: 6,
    category: "Innovation",
    icon: "🚀",
    color: "#ff4488",
    title: "Solar-Powered Smart Parking Sensors Launched",
    summary:
      "New generation of eco-friendly parking sensors powered by solar energy deployed across Bangalore tech parks.",
    city: "Bangalore",
    time: "3 days ago",
    trending: false,
    tags: ["Green", "Innovation", "Bangalore"],
  },
  {
    id: 7,
    category: "Statistics",
    icon: "📊",
    color: "#00f0ff",
    title: "India Smart Parking Market to Reach ₹5000 Cr by 2026",
    summary:
      "Industry report shows rapid growth in AI-based parking solutions across tier-1 and tier-2 cities in India.",
    city: "National",
    time: "4 days ago",
    trending: true,
    tags: ["Market", "Growth", "India"],
  },
  {
    id: 8,
    category: "Update",
    icon: "🔄",
    color: "#7b2ff7",
    title: "Hyderabad Airport Integrates Smart Parking with Metro",
    summary:
      "Seamless parking-to-metro transit system launched at RGIA offering integrated ticketing and real-time updates.",
    city: "Hyderabad",
    time: "5 days ago",
    trending: false,
    tags: ["Integration", "Metro", "Hyderabad"],
  },
];

export default function ParkingNews() {
  const [filter, setFilter] = useState("all");
  const [selectedNews, setSelectedNews] = useState(null);
  const [liveAlert, setLiveAlert] = useState(null);
  const [savedNews, setSavedNews] = useState([]);

  const cities = [
    "all",
    "Chennai",
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Kochi",
    "National",
  ];

  const liveAlerts = [
    "🔴 Phoenix MarketCity Chennai — 95% Full! Book now",
    "🟡 Orion Mall Bangalore — Moderate traffic expected",
    "🟢 Lulu Mall Kochi — 200 slots just freed up!",
    "🤖 AI Alert: DLF Mall Delhi peak hour in 30 mins",
    "⚡ Flash Deal: Free parking at Express Avenue until 12PM",
  ];

  useEffect(() => {
    let index = 0;
    setLiveAlert(liveAlerts[0]);
    const interval = setInterval(() => {
      index = (index + 1) % liveAlerts.length;
      setLiveAlert(liveAlerts[index]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filtered =
    filter === "all" ? newsData : newsData.filter((n) => n.city === filter);
  const trending = newsData.filter((n) => n.trending);

  const toggleSave = (id) => {
    setSavedNews((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div style={{ color: "#fff", fontFamily: "'Segoe UI', sans-serif" }}>
      <style>{`
        @keyframes slideIn { from{transform:translateX(-100%);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ticker { 0%{transform:translateX(100%)} 100%{transform:translateX(-100%)} }
      `}</style>

      <h2 style={{ color: "#00f0ff", marginBottom: "4px" }}>
        📰 Parking News & Updates
      </h2>
      <p style={{ color: "#888", marginBottom: "20px", fontSize: "14px" }}>
        Latest AI parking news across India
      </p>

      {/* Live Alert Ticker */}
      <div
        style={{
          background: "rgba(255,68,68,0.1)",
          border: "1px solid rgba(255,68,68,0.3)",
          borderRadius: "10px",
          padding: "10px 16px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#ff4444",
              animation: "pulse 1s infinite",
            }}
          />
          <span
            style={{ color: "#ff4444", fontWeight: "bold", fontSize: "12px" }}
          >
            LIVE
          </span>
        </div>
        <div
          style={{
            color: "#ffd700",
            fontSize: "13px",
            animation: "fadeIn 0.5s ease",
            flex: 1,
          }}
        >
          {liveAlert}
        </div>
      </div>

      {/* Trending Section */}
      <div style={{ marginBottom: "28px" }}>
        <h3
          style={{ color: "#ffd700", marginBottom: "14px", fontSize: "15px" }}
        >
          🔥 Trending Now
        </h3>
        <div
          style={{
            display: "flex",
            gap: "12px",
            overflowX: "auto",
            paddingBottom: "8px",
          }}
        >
          {trending.map((news) => (
            <div
              key={news.id}
              onClick={() => setSelectedNews(news)}
              style={{
                minWidth: "220px",
                background: `${news.color}11`,
                border: `1px solid ${news.color}44`,
                borderRadius: "12px",
                padding: "14px",
                cursor: "pointer",
                transition: "all 0.3s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 0 20px ${news.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                {news.icon}
              </div>
              <div
                style={{
                  color: news.color,
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                {news.category}
              </div>
              <div
                style={{
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "bold",
                  lineHeight: "1.4",
                }}
              >
                {news.title}
              </div>
              <div
                style={{ color: "#666", fontSize: "10px", marginTop: "8px" }}
              >
                🔥 Trending • {news.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* City Filter */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setFilter(city)}
            style={{
              padding: "5px 14px",
              background: filter === city ? "#00f0ff" : "transparent",
              border: "1px solid rgba(0,240,255,0.3)",
              color: filter === city ? "#000" : "#00f0ff",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: filter === city ? "bold" : "normal",
            }}
          >
            {city}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "16px",
        }}
      >
        {filtered.map((news) => (
          <div
            key={news.id}
            style={{
              background: "rgba(0,0,0,0.4)",
              border: `1px solid ${news.color}33`,
              borderRadius: "16px",
              padding: "20px",
              cursor: "pointer",
              transition: "all 0.3s",
              animation: "fadeIn 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = `0 0 20px ${news.color}22`;
              e.currentTarget.style.border = `1px solid ${news.color}66`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.border = `1px solid ${news.color}33`;
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "12px",
              }}
            >
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <span style={{ fontSize: "24px" }}>{news.icon}</span>
                <span
                  style={{
                    background: `${news.color}22`,
                    border: `1px solid ${news.color}`,
                    color: news.color,
                    borderRadius: "8px",
                    padding: "2px 8px",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {news.category}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSave(news.id);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: savedNews.includes(news.id) ? "#ffd700" : "#444",
                }}
              >
                {savedNews.includes(news.id) ? "🔖" : "🏷️"}
              </button>
            </div>

            <h3
              style={{
                color: "#fff",
                fontSize: "14px",
                lineHeight: "1.5",
                marginBottom: "10px",
              }}
              onClick={() => setSelectedNews(news)}
            >
              {news.title}
            </h3>

            <p
              style={{
                color: "#888",
                fontSize: "12px",
                lineHeight: "1.5",
                marginBottom: "14px",
              }}
            >
              {news.summary.length > 100
                ? news.summary.slice(0, 100) + "..."
                : news.summary}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginBottom: "12px",
              }}
            >
              {news.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(0,240,255,0.05)",
                    border: "1px solid rgba(0,240,255,0.2)",
                    color: "#00f0ff44",
                    borderRadius: "6px",
                    padding: "2px 8px",
                    fontSize: "10px",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "11px",
              }}
            >
              <span style={{ color: "#666" }}>
                📍 {news.city} • {news.time}
              </span>
              {news.trending && (
                <span
                  style={{
                    color: "#ffd700",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  🔥 Trending
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#0a0a1f",
              border: `1px solid ${selectedNews.color}`,
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "560px",
              width: "100%",
              boxShadow: `0 0 40px ${selectedNews.color}44`,
              animation: "fadeIn 0.3s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "20px",
              }}
            >
              <div
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                <span style={{ fontSize: "32px" }}>{selectedNews.icon}</span>
                <div>
                  <span
                    style={{
                      background: `${selectedNews.color}22`,
                      border: `1px solid ${selectedNews.color}`,
                      color: selectedNews.color,
                      borderRadius: "8px",
                      padding: "3px 10px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedNews.category}
                  </span>
                  <div
                    style={{
                      color: "#888",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    📍 {selectedNews.city} • {selectedNews.time}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#888",
                  fontSize: "22px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <h2
              style={{
                color: "#fff",
                fontSize: "18px",
                lineHeight: "1.5",
                marginBottom: "16px",
              }}
            >
              {selectedNews.title}
            </h2>
            <p
              style={{
                color: "#aaa",
                fontSize: "14px",
                lineHeight: "1.8",
                marginBottom: "20px",
              }}
            >
              {selectedNews.summary}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              {selectedNews.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: `${selectedNews.color}11`,
                    border: `1px solid ${selectedNews.color}44`,
                    color: selectedNews.color,
                    borderRadius: "8px",
                    padding: "4px 12px",
                    fontSize: "12px",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => toggleSave(selectedNews.id)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: savedNews.includes(selectedNews.id)
                    ? "rgba(255,215,0,0.1)"
                    : "rgba(0,240,255,0.1)",
                  border: `1px solid ${savedNews.includes(selectedNews.id) ? "#ffd700" : "rgba(0,240,255,0.3)"}`,
                  color: savedNews.includes(selectedNews.id)
                    ? "#ffd700"
                    : "#00f0ff",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                {savedNews.includes(selectedNews.id)
                  ? "🔖 Saved!"
                  : "🏷️ Save Article"}
              </button>
              <button
                onClick={() => setSelectedNews(null)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "linear-gradient(90deg, #00f0ff, #7b2ff7)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
