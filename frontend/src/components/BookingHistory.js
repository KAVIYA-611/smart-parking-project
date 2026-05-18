import React, { useState, useEffect } from "react";
import { getBookings } from "../api";

export default function BookingHistory({ user }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  const totalSpent = bookings.reduce((a, b) => a + b.duration * 50, 0);

  return (
    <div style={{ color: "#fff", fontFamily: "'Segoe UI', sans-serif" }}>
      <h2 style={{ color: "#00f0ff", marginBottom: "8px" }}>
        📱 My Booking History
      </h2>
      <p style={{ color: "#888", marginBottom: "24px", fontSize: "14px" }}>
        All your parking reservations
      </p>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {[
          {
            label: "Total Bookings",
            value: bookings.length,
            color: "#00f0ff",
            icon: "🎫",
          },
          {
            label: "Active",
            value: bookings.filter((b) => b.status === "active").length,
            color: "#00ff88",
            icon: "✅",
          },
          {
            label: "Completed",
            value: bookings.filter((b) => b.status !== "active").length,
            color: "#7b2ff7",
            icon: "✔️",
          },
          {
            label: "Total Spent",
            value: `₹${totalSpent}`,
            color: "#ffd700",
            icon: "💰",
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: `rgba(0,0,0,0.3)`,
              border: `1px solid ${s.color}44`,
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "24px" }}>{s.icon}</div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: s.color,
                margin: "4px 0",
              }}
            >
              {s.value}
            </div>
            <div style={{ color: "#888", fontSize: "11px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "8px 20px",
              background: filter === f ? "#00f0ff" : "transparent",
              border: "1px solid #00f0ff",
              color: filter === f ? "#000" : "#00f0ff",
              borderRadius: "8px",
              cursor: "pointer",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#00f0ff" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔄</div>
          Loading bookings...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#444" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🅿️</div>
          <div style={{ fontSize: "18px", marginBottom: "8px", color: "#666" }}>
            No bookings yet!
          </div>
          <div style={{ fontSize: "14px" }}>
            Go to parking map and book a slot
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filtered.map((booking, i) => (
            <div
              key={i}
              style={{
                background: "rgba(0,240,255,0.03)",
                border: "1px solid rgba(0,240,255,0.2)",
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div
                style={{ display: "flex", gap: "16px", alignItems: "center" }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(0,240,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  🅿️
                </div>
                <div>
                  <div
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {booking.mallName}
                  </div>
                  <div style={{ color: "#888", fontSize: "13px" }}>
                    Slot: {booking.slotId} • Floor: {booking.floor}
                  </div>
                  <div style={{ color: "#888", fontSize: "13px" }}>
                    🚗 {booking.vehicleNumber} • ⏰ {booking.entryTime}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    color: booking.status === "active" ? "#00ff88" : "#888",
                    fontWeight: "bold",
                    marginBottom: "4px",
                  }}
                >
                  {booking.status === "active" ? "✅ Active" : "✔️ Completed"}
                </div>
                <div style={{ color: "#ffd700", fontSize: "14px" }}>
                  ₹{booking.duration * 50}
                </div>
                <div style={{ color: "#888", fontSize: "12px" }}>
                  {booking.duration} hr{booking.duration > 1 ? "s" : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
