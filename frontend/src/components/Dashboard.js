/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { createBooking } from "../api";
import AIDashboard from "./AIDashboard";
import NumberPlate from "./NumberPlate";
import BookingHistory from "./BookingHistory";
import Payment from "./Payment";
import Notifications from "./Notifications";
import TrafficRoute from "./TrafficRoute";
import EmailConfirmation from "./EmailConfirmation";
import SearchMalls from "./SearchMalls";
import UserProfile from "./UserProfile";
import SmartRecommendations from "./SmartRecommendations";
import ParkingNews from "./ParkingNews";
import AdvanceBooking from "./AdvanceBooking";

const cityData = {
  chennai: {
    emoji: "🌊",
    malls: ["Phoenix MarketCity", "Express Avenue", "VR Mall"],
  },
  bangalore: {
    emoji: "🌿",
    malls: ["Orion Mall", "Forum Mall", "Phoenix Marketcity"],
  },
  mumbai: {
    emoji: "🌆",
    malls: ["Palladium Mall", "R City Mall", "Oberoi Mall"],
  },
  delhi: {
    emoji: "🏛️",
    malls: ["DLF Mall", "Select Citywalk", "Ambience Mall"],
  },
  hyderabad: {
    emoji: "💎",
    malls: ["Inorbit Mall", "GVK One", "Forum Sujana"],
  },
  pune: {
    emoji: "🎓",
    malls: ["Phoenix Marketcity", "Amanora Mall", "Westend Mall"],
  },
  kolkata: {
    emoji: "🎭",
    malls: ["South City Mall", "Quest Mall", "Forum Mall"],
  },
  kochi: { emoji: "🌴", malls: ["Lulu Mall", "Centre Square", "Oberon Mall"] },
};

function generateSlots(total) {
  return Array.from({ length: total }, (_, i) => ({
    id: `SLOT-${String(i + 1).padStart(3, "0")}`,
    status: Math.random() > 0.4 ? "free" : "occupied",
    floor: i < 20 ? "B1" : i < 40 ? "B2" : "GF",
    aiPrediction:
      Math.random() > 0.5 ? "Will be free in 10 mins" : "Occupied for long",
  }));
}

function generateMallData(cityName) {
  return cityData[cityName].malls.map((name, idx) => {
    const total = 200 + idx * 50;
    const slots = generateSlots(60);
    return {
      id: `${cityName}-${idx}`,
      name,
      total,
      available: Math.floor(Math.random() * total),
      occupied: 0,
      slots,
      aiScore: Math.floor(Math.random() * 100),
    };
  });
}

export default function Dashboard({ user, onLogout }) {
  const [page, setPage] = useState("home");
  const [view, setView] = useState("cities");
  const [selectedCity, setSelectedCity] = useState(null);
  const [malls, setMalls] = useState([]);
  const [selectedMall, setSelectedMall] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState("B1");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booking, setBooking] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    vehicleNumber: "",
    duration: 1,
  });
  const [bookedSlots, setBookedSlots] = useState([]);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [slots, setSlots] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [pendingBooking, setPendingBooking] = useState(null);
  const [notifCount, setNotifCount] = useState(3);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedMall) {
        setSlots((prev) =>
          prev.map((slot) => {
            if (bookedSlots.includes(slot.id)) return slot;
            if (Math.random() > 0.95)
              return {
                ...slot,
                status: slot.status === "free" ? "occupied" : "free",
              };
            return slot;
          }),
        );
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedMall, bookedSlots]);

  useEffect(() => {
    let countdown;
    if (timeLeft > 0) {
      countdown = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && booking) {
      setBookedSlots((prev) => prev.filter((id) => id !== booking));
      setBooking(null);
      setMessage("⏰ Booking expired! Slot released.");
      setTimeout(() => setMessage(""), 3000);
    }
    return () => clearTimeout(countdown);
  }, [timeLeft, booking]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifCount((prev) => prev + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setMalls(generateMallData(city));
    setView("malls");
  };

  const handleMallClick = (mall) => {
    setSelectedMall(mall);
    setSlots(mall.slots);
    setSelectedFloor("B1");
    setView("parking");
  };

  const handleSlotClick = (slot) => {
    if (slot.status === "occupied" || bookedSlots.includes(slot.id)) return;
    setSelectedSlot(slot);
  };

  const handleBooking = async () => {
    if (!bookingForm.vehicleNumber) {
      setMessage("⚠️ Vehicle number enter panu!");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    const bookingData = {
      userId: user.id,
      mallName: selectedMall.name,
      slotId: selectedSlot.id,
      floor: selectedSlot.floor,
      vehicleNumber: bookingForm.vehicleNumber,
      userName: user.name,
      entryTime: new Date().toLocaleTimeString(),
      duration: bookingForm.duration,
      amount: bookingForm.duration * 50,
    };
    setPendingBooking(bookingData);
    setSelectedSlot(null);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      await createBooking(pendingBooking);
      setBookedSlots((prev) => [...prev, pendingBooking.slotId]);
      setSlots((prev) =>
        prev.map((s) =>
          s.id === pendingBooking.slotId ? { ...s, status: "booked" } : s,
        ),
      );
      setBooking(pendingBooking.slotId);
      setTimeLeft(pendingBooking.duration * 3600);
      setMessage(`✅ ${pendingBooking.slotId} booked & paid!`);
      setTimeout(() => setMessage(""), 3000);
      setShowPayment(false);
      setTimeout(() => setShowEmail(true), 400);
    } catch {
      setMessage("❌ Booking save failed!");
      setShowPayment(false);
    }
  };

  const floorSlots = slots.filter((s) => s.floor === selectedFloor);
  const freeCount = slots.filter((s) => s.status === "free").length;
  const occupiedCount = slots.filter((s) => s.status === "occupied").length;
  const bestSlot = slots.find(
    (s) => s.status === "free" && !bookedSlots.includes(s.id),
  );

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const navItems = [
    { id: "home", icon: "🗺️", label: "Parking Map" },
    { id: "search", icon: "🔍", label: "Search" },
    { id: "advance", icon: "📅", label: "Advance Book" },
    { id: "dashboard", icon: "📊", label: "AI Dashboard" },
    { id: "recommendations", icon: "🎯", label: "Recommendations" },
    { id: "numberplate", icon: "🔢", label: "Number Plate" },
    { id: "traffic", icon: "📍", label: "Traffic" },
    { id: "notifications", icon: "🔔", label: "Alerts", badge: notifCount },
    { id: "news", icon: "📰", label: "News" },
    { id: "bookings", icon: "📱", label: "My Bookings" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050510",
        color: "#fff",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes glow { 0%,100%{box-shadow:0 0 10px rgba(0,240,255,0.3)} 50%{box-shadow:0 0 25px rgba(0,240,255,0.6)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* Navbar */}
      <div
        style={{
          background: "rgba(0,0,0,0.95)",
          borderBottom: "1px solid rgba(0,240,255,0.15)",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(20px)",
          height: "56px",
        }}
      >
        <span
          style={{
            fontSize: "15px",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #00f0ff, #7b2ff7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            whiteSpace: "nowrap",
          }}
        >
          🅿️ AI Smart Parking India
        </span>

        {/* Desktop Nav */}
        <div
          style={{
            display: "flex",
            gap: "1px",
            flexWrap: "nowrap",
            overflowX: "auto",
          }}
        >
          {navItems.slice(0, 7).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setPage(item.id);
                if (item.id === "home") setView("cities");
                setMenuOpen(false);
              }}
              style={{
                background:
                  page === item.id ? "rgba(0,240,255,0.15)" : "transparent",
                border:
                  page === item.id
                    ? "1px solid rgba(0,240,255,0.5)"
                    : "1px solid transparent",
                color: page === item.id ? "#00f0ff" : "#888",
                padding: "5px 10px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: page === item.id ? "bold" : "normal",
                position: "relative",
                whiteSpace: "nowrap",
              }}
            >
              {item.icon} {item.label}
              {item.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-4px",
                    background: "#ff4444",
                    borderRadius: "10px",
                    padding: "1px 4px",
                    fontSize: "8px",
                    fontWeight: "bold",
                    animation: "pulse 1s infinite",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          {/* More Menu */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: menuOpen ? "rgba(0,240,255,0.15)" : "transparent",
                border: menuOpen
                  ? "1px solid rgba(0,240,255,0.5)"
                  : "1px solid transparent",
                color: "#888",
                padding: "5px 10px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              ⋯ More
            </button>
            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "38px",
                  right: 0,
                  background: "#0a0a1f",
                  border: "1px solid rgba(0,240,255,0.3)",
                  borderRadius: "12px",
                  padding: "8px",
                  minWidth: "160px",
                  zIndex: 200,
                  animation: "slideDown 0.2s ease",
                  boxShadow: "0 0 30px rgba(0,0,0,0.8)",
                }}
              >
                {navItems.slice(7).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setPage(item.id);
                      setMenuOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      width: "100%",
                      padding: "8px 12px",
                      background:
                        page === item.id
                          ? "rgba(0,240,255,0.1)"
                          : "transparent",
                      border: "none",
                      color: page === item.id ? "#00f0ff" : "#888",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "12px",
                      textAlign: "left",
                      position: "relative",
                    }}
                  >
                    {item.icon} {item.label}
                    {item.badge && (
                      <span
                        style={{
                          background: "#ff4444",
                          borderRadius: "10px",
                          padding: "1px 6px",
                          fontSize: "9px",
                          fontWeight: "bold",
                          marginLeft: "auto",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {booking && (
            <div
              style={{
                background: "rgba(0,240,255,0.1)",
                border: "1px solid #00f0ff",
                borderRadius: "8px",
                padding: "3px 8px",
                fontSize: "10px",
                color: "#00f0ff",
                animation: "glow 2s infinite",
                whiteSpace: "nowrap",
              }}
            >
              ⏱️ {formatTime(timeLeft)}
            </div>
          )}
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#00ff88",
              animation: "pulse 1s infinite",
            }}
          />
          <span
            style={{ color: "#888", fontSize: "11px", whiteSpace: "nowrap" }}
          >
            👤 {user.name}
          </span>
          <button
            onClick={onLogout}
            style={{
              background: "transparent",
              border: "1px solid #ff444466",
              color: "#ff4444",
              padding: "4px 8px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "11px",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ padding: "24px" }} onClick={() => setMenuOpen(false)}>
        {message && (
          <div
            style={{
              background: "rgba(0,240,255,0.1)",
              border: "1px solid #00f0ff",
              borderRadius: "12px",
              padding: "12px",
              marginBottom: "20px",
              textAlign: "center",
              color: "#00f0ff",
              fontSize: "14px",
              animation: "glow 1s infinite",
            }}
          >
            {message}
          </div>
        )}

        {page === "dashboard" && <AIDashboard />}
        {page === "numberplate" && <NumberPlate />}
        {page === "bookings" && <BookingHistory user={user} />}
        {page === "notifications" && <Notifications />}
        {page === "traffic" && <TrafficRoute />}
        {page === "search" && <SearchMalls />}
        {page === "profile" && <UserProfile user={user} />}
        {page === "recommendations" && <SmartRecommendations user={user} />}
        {page === "news" && <ParkingNews />}
        {page === "advance" && <AdvanceBooking user={user} />}

        {page === "home" && (
          <>
            {view === "cities" && (
              <div>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <h1
                    style={{
                      fontSize: "30px",
                      fontWeight: "bold",
                      background: "linear-gradient(90deg, #00f0ff, #7b2ff7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: "8px",
                    }}
                  >
                    Smart Co-operative Parking System
                  </h1>
                  <p style={{ color: "#888", fontSize: "14px" }}>
                    AI-Powered • Real-Time • Multi-City • IoT Enabled
                  </p>
                </div>

                <h2 style={{ color: "#00f0ff", marginBottom: "20px" }}>
                  🗺️ Select Your City
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(150px, 1fr))",
                    gap: "14px",
                    marginBottom: "40px",
                  }}
                >
                  {Object.entries(cityData).map(([city, data]) => (
                    <div
                      key={city}
                      onClick={() => handleCityClick(city)}
                      style={{
                        background: "rgba(0,240,255,0.03)",
                        border: "1px solid rgba(0,240,255,0.3)",
                        borderRadius: "16px",
                        padding: "22px 14px",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(0,240,255,0.1)";
                        e.currentTarget.style.transform = "translateY(-6px)";
                        e.currentTarget.style.boxShadow =
                          "0 0 30px rgba(0,240,255,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(0,240,255,0.03)";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div style={{ fontSize: "34px", marginBottom: "10px" }}>
                        {data.emoji}
                      </div>
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "#00f0ff",
                          textTransform: "capitalize",
                        }}
                      >
                        {city}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#888",
                          marginTop: "4px",
                        }}
                      >
                        {data.malls.length} Locations
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    background: "rgba(123,47,247,0.05)",
                    border: "1px solid rgba(123,47,247,0.3)",
                    borderRadius: "16px",
                    padding: "24px",
                  }}
                >
                  <h2
                    style={{
                      color: "#7b2ff7",
                      marginBottom: "20px",
                      textAlign: "center",
                      fontSize: "17px",
                    }}
                  >
                    🧠 How AI Parking Works
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      flexWrap: "wrap",
                      gap: "12px",
                    }}
                  >
                    {[
                      ["📷", "Camera", "IoT detect"],
                      ["🤖", "AI Process", "ML analyze"],
                      ["📊", "Data", "Real-time"],
                      ["🗺️", "Map Update", "Live slots"],
                      ["👤", "You", "Book & Pay"],
                    ].map(([icon, title, desc], i) => (
                      <div
                        key={i}
                        style={{
                          textAlign: "center",
                          flex: "1",
                          minWidth: "80px",
                        }}
                      >
                        <div style={{ fontSize: "26px" }}>{icon}</div>
                        <div
                          style={{
                            color: "#7b2ff7",
                            fontWeight: "bold",
                            margin: "6px 0 2px",
                            fontSize: "12px",
                          }}
                        >
                          {title}
                        </div>
                        <div style={{ color: "#888", fontSize: "11px" }}>
                          {desc}
                        </div>
                        {i < 4 && (
                          <div
                            style={{
                              color: "#7b2ff7",
                              fontSize: "16px",
                              marginTop: "4px",
                            }}
                          >
                            →
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {view === "malls" && (
              <div>
                <button
                  onClick={() => setView("cities")}
                  style={{
                    background: "transparent",
                    border: "1px solid #888",
                    color: "#888",
                    padding: "7px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginBottom: "16px",
                    fontSize: "13px",
                  }}
                >
                  ← Back
                </button>
                <h2
                  style={{
                    color: "#00f0ff",
                    marginBottom: "6px",
                    textTransform: "capitalize",
                    fontSize: "22px",
                  }}
                >
                  {cityData[selectedCity]?.emoji} {selectedCity} — Locations
                </h2>
                <p
                  style={{
                    color: "#888",
                    marginBottom: "20px",
                    fontSize: "13px",
                  }}
                >
                  Click any location to view live parking
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "14px",
                  }}
                >
                  {malls.map((mall) => {
                    const pct = Math.round((mall.available / mall.total) * 100);
                    return (
                      <div
                        key={mall.id}
                        onClick={() => handleMallClick(mall)}
                        style={{
                          background: "rgba(0,240,255,0.03)",
                          border: "1px solid rgba(0,240,255,0.3)",
                          borderRadius: "16px",
                          padding: "18px",
                          cursor: "pointer",
                          transition: "all 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow =
                            "0 0 25px rgba(0,240,255,0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <h3
                          style={{
                            color: "#00f0ff",
                            marginBottom: "12px",
                            fontSize: "14px",
                          }}
                        >
                          🏬 {mall.name}
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "8px",
                          }}
                        >
                          <span style={{ color: "#0f0", fontSize: "11px" }}>
                            ✅ {mall.available}
                          </span>
                          <span style={{ color: "#f55", fontSize: "11px" }}>
                            🔴 {mall.total - mall.available}
                          </span>
                        </div>
                        <div
                          style={{
                            background: "#111",
                            borderRadius: "6px",
                            height: "5px",
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              background:
                                pct > 50 ? "#0f0" : pct > 25 ? "#ff0" : "#f55",
                              width: `${pct}%`,
                              height: "100%",
                              borderRadius: "6px",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "10px",
                            marginBottom: "8px",
                          }}
                        >
                          <span style={{ color: "#888" }}>
                            Total: {mall.total}
                          </span>
                          <span style={{ color: "#7b2ff7" }}>
                            AI: {mall.aiScore}/100
                          </span>
                        </div>
                        <div
                          style={{
                            padding: "6px",
                            background: "rgba(123,47,247,0.1)",
                            borderRadius: "6px",
                            fontSize: "10px",
                            color: "#7b2ff7",
                          }}
                        >
                          🤖{" "}
                          {pct > 50 ? "Good availability" : "Getting crowded!"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {view === "parking" && selectedMall && (
              <div>
                <button
                  onClick={() => setView("malls")}
                  style={{
                    background: "transparent",
                    border: "1px solid #888",
                    color: "#888",
                    padding: "7px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginBottom: "16px",
                    fontSize: "13px",
                  }}
                >
                  ← Back
                </button>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        color: "#00f0ff",
                        fontSize: "18px",
                        marginBottom: "4px",
                      }}
                    >
                      🏬 {selectedMall.name}
                    </h2>
                    <p style={{ color: "#888", fontSize: "12px" }}>
                      🔄 Live — updates every 3s
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div
                      style={{
                        background: "rgba(0,255,0,0.1)",
                        border: "1px solid #0f0",
                        borderRadius: "8px",
                        padding: "8px 14px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "#0f0",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        {freeCount}
                      </div>
                      <div style={{ color: "#888", fontSize: "10px" }}>
                        Free
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(255,0,0,0.1)",
                        border: "1px solid #f55",
                        borderRadius: "8px",
                        padding: "8px 14px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "#f55",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        {occupiedCount}
                      </div>
                      <div style={{ color: "#888", fontSize: "10px" }}>
                        Occupied
                      </div>
                    </div>
                  </div>
                </div>

                {bestSlot && (
                  <div
                    style={{
                      background: "rgba(123,47,247,0.1)",
                      border: "1px solid #7b2ff7",
                      borderRadius: "12px",
                      padding: "14px",
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ fontSize: "22px" }}>🤖</span>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          color: "#7b2ff7",
                          fontWeight: "bold",
                          fontSize: "13px",
                        }}
                      >
                        AI Recommended
                      </div>
                      <div style={{ color: "#fff", fontSize: "13px" }}>
                        {bestSlot.id} — Floor {bestSlot.floor}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedSlot(bestSlot)}
                      style={{
                        background: "#7b2ff7",
                        border: "none",
                        color: "#fff",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "13px",
                      }}
                    >
                      Quick Book ⚡
                    </button>
                  </div>
                )}

                <div
                  style={{ display: "flex", gap: "10px", marginBottom: "16px" }}
                >
                  {["B1", "B2", "GF"].map((floor) => (
                    <button
                      key={floor}
                      onClick={() => setSelectedFloor(floor)}
                      style={{
                        background:
                          selectedFloor === floor ? "#00f0ff" : "transparent",
                        border: "1px solid #00f0ff",
                        color: selectedFloor === floor ? "#000" : "#00f0ff",
                        padding: "7px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "13px",
                      }}
                    >
                      {floor}
                    </button>
                  ))}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(10, 1fr)",
                    gap: "6px",
                    marginBottom: "20px",
                  }}
                >
                  {floorSlots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot.id);
                    const isBest = bestSlot?.id === slot.id;
                    const color = isBooked
                      ? "#ffd700"
                      : slot.status === "free"
                        ? "#00ff00"
                        : "#ff4444";
                    return (
                      <div
                        key={slot.id}
                        onClick={() => handleSlotClick(slot)}
                        title={`${slot.id} - ${slot.status}`}
                        style={{
                          background: `${color}22`,
                          border: `2px solid ${color}`,
                          borderRadius: "6px",
                          padding: "8px 2px",
                          textAlign: "center",
                          cursor:
                            slot.status === "free" && !isBooked
                              ? "pointer"
                              : "default",
                          fontSize: "8px",
                          color,
                          boxShadow: isBest ? `0 0 10px ${color}` : "none",
                          transition: "all 0.3s",
                        }}
                      >
                        {isBooked ? "🔖" : slot.status === "free" ? "🟢" : "🔴"}
                        <br />
                        {slot.id.split("-")[1]}
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <span style={{ color: "#0f0", fontSize: "12px" }}>
                    🟢 Free
                  </span>
                  <span style={{ color: "#f44", fontSize: "12px" }}>
                    🔴 Occupied
                  </span>
                  <span style={{ color: "#ffd700", fontSize: "12px" }}>
                    🔖 Booked
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Slot Booking Modal */}
      {selectedSlot && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#0a0a1f",
              border: "1px solid #00f0ff",
              borderRadius: "20px",
              padding: "28px",
              width: "360px",
              boxShadow: "0 0 50px rgba(0,240,255,0.3)",
            }}
          >
            <h3
              style={{
                color: "#00f0ff",
                marginBottom: "16px",
                fontSize: "18px",
              }}
            >
              🅿️ Book {selectedSlot.id}
            </h3>
            <div
              style={{
                background: "rgba(0,240,255,0.05)",
                borderRadius: "10px",
                padding: "12px",
                marginBottom: "16px",
                fontSize: "13px",
              }}
            >
              <div style={{ color: "#888", marginBottom: "4px" }}>
                📍 <span style={{ color: "#fff" }}>{selectedMall?.name}</span>
              </div>
              <div style={{ color: "#888", marginBottom: "4px" }}>
                🏢 Floor:{" "}
                <span style={{ color: "#fff" }}>{selectedSlot.floor}</span>
              </div>
              <div style={{ color: "#888" }}>
                🤖{" "}
                <span style={{ color: "#7b2ff7" }}>
                  {selectedSlot.aiPrediction}
                </span>
              </div>
            </div>
            <input
              placeholder="Vehicle Number (TN01AB1234)"
              value={bookingForm.vehicleNumber}
              onChange={(e) =>
                setBookingForm({
                  ...bookingForm,
                  vehicleNumber: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "11px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(0,240,255,0.3)",
                borderRadius: "8px",
                color: "#fff",
                marginBottom: "10px",
                boxSizing: "border-box",
                fontSize: "13px",
              }}
            />
            <select
              value={bookingForm.duration}
              onChange={(e) =>
                setBookingForm({
                  ...bookingForm,
                  duration: Number(e.target.value),
                })
              }
              style={{
                width: "100%",
                padding: "11px",
                background: "#0a0a1f",
                border: "1px solid rgba(0,240,255,0.3)",
                borderRadius: "8px",
                color: "#fff",
                marginBottom: "16px",
                boxSizing: "border-box",
                fontSize: "13px",
              }}
            >
              <option value={1}>1 Hour — ₹50</option>
              <option value={2}>2 Hours — ₹100</option>
              <option value={3}>3 Hours — ₹150</option>
            </select>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setSelectedSlot(null)}
                style={{
                  flex: 1,
                  padding: "11px",
                  background: "transparent",
                  border: "1px solid #888",
                  color: "#888",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                style={{
                  flex: 1,
                  padding: "11px",
                  background: "linear-gradient(90deg, #00f0ff, #7b2ff7)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                Pay & Book 💳
              </button>
            </div>
          </div>
        </div>
      )}

      {showPayment && (
        <Payment
          booking={pendingBooking}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPayment(false)}
        />
      )}

      {showEmail && (
        <EmailConfirmation
          booking={pendingBooking}
          onClose={() => setShowEmail(false)}
        />
      )}
    </div>
  );
}
