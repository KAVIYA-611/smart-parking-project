import React, { useState, useEffect } from "react";

const notificationTemplates = [
  {
    type: "success",
    icon: "✅",
    title: "Slot Available!",
    msg: "Phoenix MarketCity B1 — 15 slots just freed up!",
  },
  {
    type: "warning",
    icon: "⚠️",
    title: "Getting Crowded",
    msg: "Orion Mall Bangalore — Only 8 slots remaining!",
  },
  {
    type: "info",
    icon: "🤖",
    title: "AI Prediction",
    msg: "DLF Mall Delhi will be 80% full in 20 minutes",
  },
  {
    type: "success",
    icon: "🎉",
    title: "Booking Confirmed",
    msg: "Your slot SLOT-012 is reserved for 2 hours",
  },
  {
    type: "warning",
    icon: "⏰",
    title: "Expiry Alert",
    msg: "Your booking expires in 10 minutes!",
  },
  {
    type: "info",
    icon: "📊",
    title: "Peak Hour Alert",
    msg: "High traffic expected at Mumbai malls 6-9 PM",
  },
  {
    type: "success",
    icon: "💰",
    title: "Payment Done",
    msg: "₹100 payment successful for R City Mall",
  },
  {
    type: "info",
    icon: "🌡️",
    title: "Heatmap Update",
    msg: "Chennai malls showing low occupancy now",
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    // Generate initial notifications
    const initial = notificationTemplates.map((n, i) => ({
      ...n,
      id: i,
      time: new Date(Date.now() - i * 60000).toLocaleTimeString(),
      read: i > 2,
    }));
    setNotifications(initial);
    setUnread(initial.filter((n) => !n.read).length);

    // Add live notifications
    const interval = setInterval(() => {
      const template =
        notificationTemplates[
          Math.floor(Math.random() * notificationTemplates.length)
        ];
      const newNotif = {
        ...template,
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev.slice(0, 19)]);
      setUnread((prev) => prev + 1);

      // Show toast
      setToasts((prev) => [...prev, { ...newNotif, toastId: Date.now() }]);
      setTimeout(() => setToasts((prev) => prev.slice(1)), 4000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnread(0);
  };

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    setUnread((prev) => Math.max(0, prev - 1));
  };

  const deleteNotif = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getColor = (type) => {
    if (type === "success") return "#00ff88";
    if (type === "warning") return "#ffd700";
    return "#00f0ff";
  };

  const filtered = notifications.filter((n) =>
    filter === "all" ? true : filter === "unread" ? !n.read : n.type === filter,
  );

  return (
    <div
      style={{
        color: "#fff",
        fontFamily: "'Segoe UI', sans-serif",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes slideIn { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes fadeOut { from{opacity:1} to{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      `}</style>

      {/* Toast Notifications */}
      <div
        style={{
          position: "fixed",
          top: "80px",
          right: "24px",
          zIndex: 3000,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.toastId}
            style={{
              background: "#0a0a1f",
              border: `1px solid ${getColor(toast.type)}`,
              borderRadius: "12px",
              padding: "14px 18px",
              minWidth: "300px",
              boxShadow: `0 0 20px ${getColor(toast.type)}44`,
              animation: "slideIn 0.3s ease",
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: "20px" }}>{toast.icon}</span>
            <div>
              <div
                style={{
                  color: getColor(toast.type),
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                {toast.title}
              </div>
              <div
                style={{ color: "#888", fontSize: "12px", marginTop: "2px" }}
              >
                {toast.msg}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h2 style={{ color: "#00f0ff", margin: "0 0 4px" }}>
            🔔 Notifications
          </h2>
          <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>
            Real-time AI parking alerts
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {unread > 0 && (
            <div
              style={{
                background: "#ff4444",
                borderRadius: "20px",
                padding: "4px 12px",
                fontSize: "12px",
                fontWeight: "bold",
                animation: "pulse 1s infinite",
              }}
            >
              {unread} unread
            </div>
          )}
          <button
            onClick={markAllRead}
            style={{
              background: "transparent",
              border: "1px solid rgba(0,240,255,0.3)",
              color: "#00f0ff",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Mark all read
          </button>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        {[
          {
            label: "Total",
            value: notifications.length,
            color: "#00f0ff",
            icon: "🔔",
          },
          { label: "Unread", value: unread, color: "#ff4444", icon: "🔴" },
          {
            label: "Alerts",
            value: notifications.filter((n) => n.type === "warning").length,
            color: "#ffd700",
            icon: "⚠️",
          },
          {
            label: "AI Updates",
            value: notifications.filter((n) => n.type === "info").length,
            color: "#7b2ff7",
            icon: "🤖",
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
              {s.value}
            </div>
            <div style={{ color: "#888", fontSize: "11px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {["all", "unread", "success", "warning", "info"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 16px",
              background: filter === f ? "#00f0ff" : "transparent",
              border: "1px solid rgba(0,240,255,0.3)",
              color: filter === f ? "#000" : "#00f0ff",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: filter === f ? "bold" : "normal",
              textTransform: "capitalize",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {filtered.map((notif) => (
          <div
            key={notif.id}
            onClick={() => markRead(notif.id)}
            style={{
              background: notif.read
                ? "rgba(255,255,255,0.02)"
                : `rgba(${getColor(notif.type) === "#00ff88" ? "0,255,136" : getColor(notif.type) === "#ffd700" ? "255,215,0" : "0,240,255"},0.05)`,
              border: `1px solid ${notif.read ? "#ffffff11" : getColor(notif.type) + "44"}`,
              borderRadius: "12px",
              padding: "16px",
              cursor: "pointer",
              display: "flex",
              gap: "14px",
              alignItems: "flex-start",
              transition: "all 0.2s",
              position: "relative",
            }}
          >
            {!notif.read && (
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: getColor(notif.type),
                  animation: "pulse 1s infinite",
                }}
              />
            )}

            <div style={{ fontSize: "24px", minWidth: "32px" }}>
              {notif.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    color: getColor(notif.type),
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {notif.title}
                </span>
                <span style={{ color: "#666", fontSize: "11px" }}>
                  {notif.time}
                </span>
              </div>
              <div style={{ color: "#aaa", fontSize: "13px" }}>{notif.msg}</div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNotif(notif.id);
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "#666",
                cursor: "pointer",
                fontSize: "16px",
                padding: "0 4px",
              }}
            >
              ✕
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px", color: "#444" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔕</div>
            <div>No notifications</div>
          </div>
        )}
      </div>
    </div>
  );
}
