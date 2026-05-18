import React, { useState, useEffect, useRef } from "react";

const allLocations = [
  {
    name: "Phoenix MarketCity",
    city: "Chennai",
    type: "Mall",
    rating: 4.5,
    slots: 500,
    available: 230,
    distance: "2.3 km",
    price: 50,
  },
  {
    name: "Express Avenue",
    city: "Chennai",
    type: "Mall",
    rating: 4.2,
    slots: 400,
    available: 180,
    distance: "3.1 km",
    price: 40,
  },
  {
    name: "VR Mall",
    city: "Chennai",
    type: "Mall",
    rating: 4.0,
    slots: 350,
    available: 150,
    distance: "5.2 km",
    price: 35,
  },
  {
    name: "Apollo Hospital",
    city: "Chennai",
    type: "Hospital",
    rating: 4.6,
    slots: 300,
    available: 120,
    distance: "4.2 km",
    price: 30,
  },
  {
    name: "Chennai Airport",
    city: "Chennai",
    type: "Airport",
    rating: 4.4,
    slots: 1000,
    available: 450,
    distance: "15.2 km",
    price: 100,
  },
  {
    name: "Chennai Central Railway",
    city: "Chennai",
    type: "Railway",
    rating: 3.8,
    slots: 400,
    available: 200,
    distance: "5.1 km",
    price: 20,
  },
  {
    name: "Marina Beach Parking",
    city: "Chennai",
    type: "Tourist",
    rating: 3.9,
    slots: 200,
    available: 100,
    distance: "6.3 km",
    price: 20,
  },
  {
    name: "Orion Mall",
    city: "Bangalore",
    type: "Mall",
    rating: 4.6,
    slots: 600,
    available: 280,
    distance: "3.2 km",
    price: 60,
  },
  {
    name: "Forum Mall",
    city: "Bangalore",
    type: "Mall",
    rating: 4.3,
    slots: 450,
    available: 200,
    distance: "4.1 km",
    price: 50,
  },
  {
    name: "Manipal Hospital",
    city: "Bangalore",
    type: "Hospital",
    rating: 4.5,
    slots: 250,
    available: 80,
    distance: "5.2 km",
    price: 40,
  },
  {
    name: "Kempegowda Airport",
    city: "Bangalore",
    type: "Airport",
    rating: 4.3,
    slots: 1200,
    available: 500,
    distance: "35 km",
    price: 120,
  },
  {
    name: "Lalbagh Garden",
    city: "Bangalore",
    type: "Tourist",
    rating: 4.1,
    slots: 150,
    available: 70,
    distance: "3.8 km",
    price: 20,
  },
  {
    name: "Palladium Mall",
    city: "Mumbai",
    type: "Mall",
    rating: 4.7,
    slots: 550,
    available: 150,
    distance: "2.8 km",
    price: 100,
  },
  {
    name: "R City Mall",
    city: "Mumbai",
    type: "Mall",
    rating: 4.1,
    slots: 480,
    available: 200,
    distance: "4.5 km",
    price: 80,
  },
  {
    name: "Lilavati Hospital",
    city: "Mumbai",
    type: "Hospital",
    rating: 4.6,
    slots: 280,
    available: 90,
    distance: "3.5 km",
    price: 50,
  },
  {
    name: "Kokilaben Hospital",
    city: "Mumbai",
    type: "Hospital",
    rating: 4.7,
    slots: 300,
    available: 110,
    distance: "5.1 km",
    price: 60,
  },
  {
    name: "Mumbai Airport",
    city: "Mumbai",
    type: "Airport",
    rating: 4.5,
    slots: 1500,
    available: 600,
    distance: "20 km",
    price: 150,
  },
  {
    name: "Gateway of India",
    city: "Mumbai",
    type: "Tourist",
    rating: 4.2,
    slots: 180,
    available: 60,
    distance: "6.2 km",
    price: 30,
  },
  {
    name: "DLF Mall of India",
    city: "Delhi",
    type: "Mall",
    rating: 4.4,
    slots: 700,
    available: 320,
    distance: "4.5 km",
    price: 80,
  },
  {
    name: "Select Citywalk",
    city: "Delhi",
    type: "Mall",
    rating: 4.5,
    slots: 500,
    available: 220,
    distance: "3.8 km",
    price: 70,
  },
  {
    name: "AIIMS Hospital",
    city: "Delhi",
    type: "Hospital",
    rating: 4.5,
    slots: 400,
    available: 100,
    distance: "6.2 km",
    price: 20,
  },
  {
    name: "IGI Airport",
    city: "Delhi",
    type: "Airport",
    rating: 4.6,
    slots: 2000,
    available: 800,
    distance: "25 km",
    price: 200,
  },
  {
    name: "New Delhi Railway",
    city: "Delhi",
    type: "Railway",
    rating: 4.2,
    slots: 600,
    available: 250,
    distance: "4.1 km",
    price: 25,
  },
  {
    name: "Qutub Minar Parking",
    city: "Delhi",
    type: "Tourist",
    rating: 4.0,
    slots: 200,
    available: 80,
    distance: "8.5 km",
    price: 30,
  },
  {
    name: "Inorbit Mall",
    city: "Hyderabad",
    type: "Mall",
    rating: 4.3,
    slots: 520,
    available: 240,
    distance: "3.8 km",
    price: 50,
  },
  {
    name: "GVK One Mall",
    city: "Hyderabad",
    type: "Mall",
    rating: 4.2,
    slots: 400,
    available: 180,
    distance: "4.2 km",
    price: 45,
  },
  {
    name: "Yashoda Hospital",
    city: "Hyderabad",
    type: "Hospital",
    rating: 4.4,
    slots: 260,
    available: 100,
    distance: "4.5 km",
    price: 35,
  },
  {
    name: "Rajiv Gandhi Airport",
    city: "Hyderabad",
    type: "Airport",
    rating: 4.4,
    slots: 1100,
    available: 480,
    distance: "28 km",
    price: 100,
  },
  {
    name: "Charminar Parking",
    city: "Hyderabad",
    type: "Tourist",
    rating: 3.9,
    slots: 160,
    available: 60,
    distance: "7.2 km",
    price: 20,
  },
  {
    name: "Lulu Mall",
    city: "Kochi",
    type: "Mall",
    rating: 4.8,
    slots: 800,
    available: 420,
    distance: "2.1 km",
    price: 40,
  },
  {
    name: "Centre Square Mall",
    city: "Kochi",
    type: "Mall",
    rating: 4.1,
    slots: 300,
    available: 140,
    distance: "3.5 km",
    price: 35,
  },
  {
    name: "Amrita Hospital",
    city: "Kochi",
    type: "Hospital",
    rating: 4.6,
    slots: 300,
    available: 110,
    distance: "3.8 km",
    price: 30,
  },
  {
    name: "Kochi Airport",
    city: "Kochi",
    type: "Airport",
    rating: 4.5,
    slots: 900,
    available: 380,
    distance: "22 km",
    price: 80,
  },
  {
    name: "Ernakulam Railway",
    city: "Kochi",
    type: "Railway",
    rating: 4.1,
    slots: 300,
    available: 120,
    distance: "4.2 km",
    price: 15,
  },
  {
    name: "South City Mall",
    city: "Kolkata",
    type: "Mall",
    rating: 4.1,
    slots: 450,
    available: 200,
    distance: "4.2 km",
    price: 40,
  },
  {
    name: "Quest Mall",
    city: "Kolkata",
    type: "Mall",
    rating: 4.4,
    slots: 380,
    available: 180,
    distance: "3.5 km",
    price: 45,
  },
  {
    name: "AMRI Hospital",
    city: "Kolkata",
    type: "Hospital",
    rating: 4.3,
    slots: 220,
    available: 85,
    distance: "5.1 km",
    price: 30,
  },
  {
    name: "Netaji Airport",
    city: "Kolkata",
    type: "Airport",
    rating: 4.2,
    slots: 800,
    available: 320,
    distance: "18 km",
    price: 80,
  },
  {
    name: "Howrah Railway",
    city: "Kolkata",
    type: "Railway",
    rating: 4.0,
    slots: 500,
    available: 220,
    distance: "3.5 km",
    price: 15,
  },
  {
    name: "Victoria Memorial",
    city: "Kolkata",
    type: "Tourist",
    rating: 4.3,
    slots: 200,
    available: 90,
    distance: "5.8 km",
    price: 25,
  },
  {
    name: "Phoenix Marketcity",
    city: "Pune",
    type: "Mall",
    rating: 4.2,
    slots: 420,
    available: 180,
    distance: "3.5 km",
    price: 50,
  },
  {
    name: "Amanora Mall",
    city: "Pune",
    type: "Mall",
    rating: 4.1,
    slots: 380,
    available: 160,
    distance: "4.8 km",
    price: 45,
  },
  {
    name: "Ruby Hall Clinic",
    city: "Pune",
    type: "Hospital",
    rating: 4.4,
    slots: 240,
    available: 90,
    distance: "4.2 km",
    price: 30,
  },
  {
    name: "Pune Airport",
    city: "Pune",
    type: "Airport",
    rating: 4.1,
    slots: 600,
    available: 250,
    distance: "12 km",
    price: 70,
  },
  {
    name: "Pune Railway",
    city: "Pune",
    type: "Railway",
    rating: 3.9,
    slots: 320,
    available: 130,
    distance: "5.5 km",
    price: 15,
  },
];

const typeColors = {
  Mall: { border: "#00f0ff", badge: "#00f0ff22", text: "#00f0ff" },
  Hospital: { border: "#00ff88", badge: "#00ff8822", text: "#00ff88" },
  Airport: { border: "#a855f7", badge: "#a855f722", text: "#a855f7" },
  Railway: { border: "#ffd700", badge: "#ffd70022", text: "#ffd700" },
  Tourist: { border: "#ff6b35", badge: "#ff6b3522", text: "#ff6b35" },
};

export default function SearchMalls({ onBack }) {
  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [results, setResults] = useState(allLocations);
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const [voiceSupported, setVoiceSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setVoiceSupported(true);
    }
  }, []);

  useEffect(() => {
    let filtered = allLocations.filter((loc) => {
      const q = query.toLowerCase();
      const matchQuery =
        !query ||
        loc.name.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.type.toLowerCase().includes(q);
      const matchCity = cityFilter === "All" || loc.city === cityFilter;
      const matchType = typeFilter === "All" || loc.type === typeFilter;
      return matchQuery && matchCity && matchType;
    });
    setResults(filtered);
  }, [query, cityFilter, typeFilter]);

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    recognitionRef.current = r;
    r.lang = "en-IN";
    r.continuous = false;
    r.interimResults = false;

    r.onstart = () => {
      setIsListening(true);
      setVoiceStatus("🎤 Listening... Speak now!");
    };

    r.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setVoiceStatus("✅ Got: " + text);

      const cities = [
        "chennai",
        "bangalore",
        "mumbai",
        "delhi",
        "hyderabad",
        "kochi",
        "kolkata",
        "pune",
      ];
      const types = ["mall", "hospital", "airport", "railway", "tourist"];

      let cityFound = false;
      let typeFound = false;

      // City detect pannurom
      cities.forEach((c) => {
        if (text.toLowerCase().includes(c)) {
          setCityFilter(c.charAt(0).toUpperCase() + c.slice(1));
          cityFound = true;
        }
      });

      // Type detect pannurom
      types.forEach((t) => {
        if (text.toLowerCase().includes(t)) {
          setTypeFilter(t.charAt(0).toUpperCase() + t.slice(1));
          typeFound = true;
        }
      });

      // City or type soluna → filter mattum, query clear
      if (cityFound || typeFound) {
        setQuery("");
      } else {
        // Vera enna solunalum → search pannurom
        setQuery(text);
      }

      setTimeout(() => setVoiceStatus(""), 3000);
    };

    r.onerror = () => {
      setIsListening(false);
      setVoiceStatus("❌ Error — Try again");
      setTimeout(() => setVoiceStatus(""), 2000);
    };

    r.onend = () => setIsListening(false);
    r.start();
  };

  const stopVoice = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const cities = [
    "All",
    "Chennai",
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Kochi",
    "Kolkata",
    "Pune",
  ];
  const types = ["All", "Mall", "Hospital", "Airport", "Railway", "Tourist"];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050510",
        color: "white",
        fontFamily: "monospace",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0, color: "#00f0ff" }}>🔍 Smart Search</h2>
        <span
          style={{
            background: "#00f0ff22",
            border: "1px solid #00f0ff44",
            color: "#00f0ff",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
          }}
        >
          {results.length} locations found
        </span>
      </div>

      {/* Search Bar + Mic Button Together */}
      <div style={{ position: "relative", marginBottom: "12px" }}>
        {/* Search Icon */}
        <span
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "18px",
            zIndex: 1,
          }}
        >
          🔍
        </span>

        {/* Input */}
        <input
          type="text"
          placeholder={
            isListening
              ? "🎤 Listening... speak now!"
              : "Search or tap mic to speak..."
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "16px 120px 16px 48px",
            background: isListening ? "#0a1628" : "#0a0a2e",
            border: `2px solid ${isListening ? "#00f0ff" : "#00f0ff33"}`,
            borderRadius: "14px",
            color: "white",
            fontSize: "15px",
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "monospace",
            transition: "all 0.3s",
          }}
        />

        {/* Right Side Buttons */}
        <div
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            gap: "6px",
            alignItems: "center",
          }}
        >
          {/* Clear Button */}
          {(query || cityFilter !== "All" || typeFilter !== "All") && (
            <button
              onClick={() => {
                setQuery("");
                setCityFilter("All");
                setTypeFilter("All");
              }}
              style={{
                background: "#ffffff11",
                border: "1px solid #ffffff22",
                color: "#888",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              ✕
            </button>
          )}

          {/* Mic Button */}
          {voiceSupported && (
            <button
              onClick={isListening ? stopVoice : startVoice}
              title={isListening ? "Stop" : "Voice Search"}
              style={{
                background: isListening
                  ? "linear-gradient(135deg, #ff4444, #cc0000)"
                  : "linear-gradient(135deg, #00f0ff, #7b2ff7)",
                border: "none",
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isListening
                  ? "0 0 20px #ff444866"
                  : "0 0 12px #00f0ff44",
                animation: isListening ? "micPulse 1s infinite" : "none",
                transition: "all 0.3s",
              }}
            >
              {isListening ? "⏹" : "🎤"}
            </button>
          )}
        </div>
      </div>

      {/* Voice Status */}
      {voiceStatus && (
        <div
          style={{
            background: "#00f0ff11",
            border: "1px solid #00f0ff33",
            borderRadius: "8px",
            padding: "8px 16px",
            color: "#00f0ff",
            fontSize: "13px",
            marginBottom: "12px",
            textAlign: "center",
          }}
        >
          {voiceStatus}
        </div>
      )}

      {/* Voice Tips — Listening panna show aagum */}
      {isListening && (
        <div
          style={{
            background: "#0a1628",
            border: "1px solid #00f0ff22",
            borderRadius: "8px",
            padding: "10px 16px",
            marginBottom: "12px",
            fontSize: "12px",
            color: "#888",
          }}
        >
          💡 Try: <span style={{ color: "#00f0ff" }}>"Chennai"</span> → Chennai
          locations &nbsp;|&nbsp;
          <span style={{ color: "#00ff88" }}>"Hospital"</span> → All hospitals
          &nbsp;|&nbsp;
          <span style={{ color: "#a855f7" }}>"Mumbai airport"</span> → Mumbai
          airports
        </div>
      )}

      {/* City Filter */}
      <div style={{ marginBottom: "10px" }}>
        <p
          style={{
            color: "#555",
            fontSize: "11px",
            margin: "0 0 6px",
            letterSpacing: "2px",
          }}
        >
          CITY
        </p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => setCityFilter(c)}
              style={{
                padding: "5px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                border: `1px solid ${cityFilter === c ? "#00f0ff" : "#333"}`,
                background: cityFilter === c ? "#00f0ff22" : "transparent",
                color: cityFilter === c ? "#00f0ff" : "#666",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div style={{ marginBottom: "20px" }}>
        <p
          style={{
            color: "#555",
            fontSize: "11px",
            margin: "0 0 6px",
            letterSpacing: "2px",
          }}
        >
          TYPE
        </p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {types.map((t) => {
            const c = typeColors[t] || {
              border: "#00f0ff",
              badge: "#00f0ff22",
              text: "#00f0ff",
            };
            return (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                style={{
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  border: `1px solid ${typeFilter === t ? c.border : "#333"}`,
                  background: typeFilter === t ? c.badge : "transparent",
                  color: typeFilter === t ? c.text : "#666",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <div style={{ display: "grid", gap: "10px" }}>
        {results.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#555" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
            No results found — Try different search
          </div>
        ) : (
          results.map((loc, i) => {
            const c = typeColors[loc.type] || typeColors.Mall;
            const pct = Math.round((loc.available / loc.slots) * 100);
            return (
              <div
                key={i}
                style={{
                  background: "#0a0a2e",
                  border: `1px solid ${c.border}33`,
                  borderRadius: "12px",
                  padding: "16px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.borderColor = c.border)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.borderColor = c.border + "33")
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "4px",
                      }}
                    >
                      <h3 style={{ margin: 0, fontSize: "15px" }}>
                        {loc.name}
                      </h3>
                      <span
                        style={{
                          background: c.badge,
                          border: `1px solid ${c.border}44`,
                          color: c.text,
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontSize: "10px",
                        }}
                      >
                        {loc.type}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "0 0 8px",
                        color: "#666",
                        fontSize: "12px",
                      }}
                    >
                      📍 {loc.city} &nbsp;•&nbsp; {loc.distance} &nbsp;•&nbsp;
                      ⭐ {loc.rating} &nbsp;•&nbsp; 💰 Rs.{loc.price}/hr
                    </p>
                  </div>
                  <div style={{ textAlign: "right", minWidth: "60px" }}>
                    <div
                      style={{
                        color:
                          pct > 50
                            ? "#00ff88"
                            : pct > 20
                              ? "#ffd700"
                              : "#ff4444",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {pct}%
                    </div>
                    <div style={{ color: "#555", fontSize: "10px" }}>free</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div
                  style={{
                    height: "3px",
                    background: "#ffffff11",
                    borderRadius: "2px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: "2px",
                      width: `${pct}%`,
                      background:
                        pct > 50 ? "#00ff88" : pct > 20 ? "#ffd700" : "#ff4444",
                      transition: "width 0.5s",
                    }}
                  />
                </div>

                <p
                  style={{ margin: "8px 0 0", color: "#555", fontSize: "11px" }}
                >
                  {loc.available} / {loc.slots} slots available
                </p>
              </div>
            );
          })
        )}
      </div>

      <style>{`
        @keyframes micPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px #ff444866; }
          50% { transform: scale(1.1); box-shadow: 0 0 30px #ff4444aa; }
        }
        input::placeholder { color: #444; }
      `}</style>
    </div>
  );
}
