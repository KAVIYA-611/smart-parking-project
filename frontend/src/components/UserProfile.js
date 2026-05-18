import React, { useState } from "react";

export default function UserProfile({ user }) {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "Test User",
    email: user?.email || "test@gmail.com",
    phone: "+91 98765 43210",
    city: "Chennai",
    vehicle: "TN01AB1234",
    vehicleType: "Car",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const stats = [
    { icon: "🎫", label: "Total Bookings", value: 24 },
    { icon: "💰", label: "Total Spent", value: "₹1,200" },
    { icon: "⭐", label: "Loyalty Points", value: 480 },
    { icon: "🏆", label: "Member Since", value: "2024" },
  ];

  const recentActivity = [
    {
      action: "✅ Booked",
      location: "Phoenix MarketCity",
      slot: "SLOT-012",
      time: "2 hrs ago",
    },
    {
      action: "💳 Paid",
      location: "Orion Mall",
      slot: "SLOT-034",
      time: "1 day ago",
    },
    {
      action: "✅ Booked",
      location: "DLF Mall",
      slot: "SLOT-056",
      time: "3 days ago",
    },
    {
      action: "⏰ Expired",
      location: "Lulu Mall",
      slot: "SLOT-078",
      time: "5 days ago",
    },
  ];

  return (
    <div
      style={{
        color: "#fff",
        fontFamily: "'Segoe UI', sans-serif",
        maxWidth: "800px",
      }}
    >
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      `}</style>

      <h2 style={{ color: "#00f0ff", marginBottom: "8px" }}>👤 User Profile</h2>
      <p style={{ color: "#888", marginBottom: "24px", fontSize: "14px" }}>
        Manage your account and preferences
      </p>

      {saved && (
        <div
          style={{
            background: "rgba(0,255,136,0.1)",
            border: "1px solid #00ff88",
            borderRadius: "10px",
            padding: "12px",
            marginBottom: "20px",
            textAlign: "center",
            color: "#00ff88",
            animation: "fadeIn 0.3s ease",
          }}
        >
          ✅ Profile saved successfully!
        </div>
      )}

      {/* Profile Card */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(0,240,255,0.05), rgba(123,47,247,0.05))",
          border: "1px solid rgba(0,240,255,0.3)",
          borderRadius: "20px",
          padding: "28px",
          marginBottom: "24px",
          display: "flex",
          gap: "24px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Avatar */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00f0ff, #7b2ff7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              margin: "0 auto 8px",
              boxShadow: "0 0 20px rgba(0,240,255,0.4)",
            }}
          >
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div
            style={{
              color: "#00ff88",
              fontSize: "11px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              justifyContent: "center",
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
            Active
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: "200px" }}>
          {editing ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {[
                { label: "Full Name", key: "name", placeholder: "Your name" },
                { label: "Email", key: "email", placeholder: "your@email.com" },
                {
                  label: "Phone",
                  key: "phone",
                  placeholder: "+91 XXXXX XXXXX",
                },
                { label: "City", key: "city", placeholder: "Your city" },
                {
                  label: "Vehicle Number",
                  key: "vehicle",
                  placeholder: "TN01AB1234",
                },
                {
                  label: "Vehicle Type",
                  key: "vehicleType",
                  placeholder: "Car/Bike/SUV",
                },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    style={{
                      color: "#888",
                      fontSize: "11px",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {f.label}
                  </label>
                  <input
                    value={profile[f.key]}
                    onChange={(e) =>
                      setProfile({ ...profile, [f.key]: e.target.value })
                    }
                    placeholder={f.placeholder}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0,240,255,0.3)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "13px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h3
                style={{ color: "#fff", fontSize: "20px", margin: "0 0 4px" }}
              >
                {profile.name}
              </h3>
              <div
                style={{
                  color: "#888",
                  fontSize: "13px",
                  marginBottom: "16px",
                }}
              >
                {profile.email}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                }}
              >
                {[
                  ["📱", "Phone", profile.phone],
                  ["🏙️", "City", profile.city],
                  ["🚗", "Vehicle", profile.vehicle],
                  ["🚙", "Type", profile.vehicleType],
                ].map(([icon, label, value]) => (
                  <div
                    key={label}
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      borderRadius: "8px",
                      padding: "8px 12px",
                    }}
                  >
                    <div
                      style={{
                        color: "#888",
                        fontSize: "10px",
                        marginBottom: "2px",
                      }}
                    >
                      {icon} {label}
                    </div>
                    <div
                      style={{
                        color: "#fff",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  style={{
                    padding: "8px 20px",
                    background: "linear-gradient(90deg, #00f0ff, #7b2ff7)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  💾 Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  style={{
                    padding: "8px 20px",
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
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                style={{
                  padding: "8px 20px",
                  background: "rgba(0,240,255,0.1)",
                  border: "1px solid rgba(0,240,255,0.3)",
                  color: "#00f0ff",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                ✏️ Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(0,240,255,0.2)",
              borderRadius: "14px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "6px" }}>
              {s.icon}
            </div>
            <div
              style={{ color: "#00f0ff", fontSize: "20px", fontWeight: "bold" }}
            >
              {s.value}
            </div>
            <div style={{ color: "#888", fontSize: "11px", marginTop: "4px" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Loyalty Points Bar */}
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
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <h3 style={{ color: "#7b2ff7", margin: 0, fontSize: "15px" }}>
            🏆 Loyalty Points
          </h3>
          <span style={{ color: "#ffd700", fontWeight: "bold" }}>
            480 / 500 pts
          </span>
        </div>
        <div
          style={{
            background: "#111",
            borderRadius: "8px",
            height: "10px",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              width: "96%",
              height: "100%",
              background: "linear-gradient(90deg, #7b2ff7, #ffd700)",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(123,47,247,0.5)",
            }}
          />
        </div>
        <div style={{ color: "#888", fontSize: "12px" }}>
          20 more points to reach Gold status! 🥇
        </div>
        <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
          {[
            "Bronze 0-200",
            "Silver 200-500",
            "Gold 500-1000",
            "Platinum 1000+",
          ].map((tier, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "6px",
                background:
                  i === 1 ? "rgba(123,47,247,0.2)" : "rgba(0,0,0,0.3)",
                borderRadius: "6px",
                textAlign: "center",
                border: i === 1 ? "1px solid #7b2ff7" : "1px solid transparent",
              }}
            >
              <div style={{ fontSize: "14px" }}>
                {["🥉", "🥈", "🥇", "💎"][i]}
              </div>
              <div
                style={{
                  color: i === 1 ? "#7b2ff7" : "#666",
                  fontSize: "9px",
                  marginTop: "2px",
                }}
              >
                {tier.split(" ")[0]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div
        style={{
          background: "rgba(0,240,255,0.03)",
          border: "1px solid rgba(0,240,255,0.2)",
          borderRadius: "16px",
          padding: "20px",
        }}
      >
        <h3
          style={{ color: "#00f0ff", marginBottom: "16px", fontSize: "15px" }}
        >
          📋 Recent Activity
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {recentActivity.map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px",
                background: "rgba(0,0,0,0.3)",
                borderRadius: "10px",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <div
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                <div style={{ fontSize: "20px" }}>{a.action.split(" ")[0]}</div>
                <div>
                  <div
                    style={{
                      color: "#fff",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    {a.location}
                  </div>
                  <div style={{ color: "#888", fontSize: "11px" }}>
                    {a.slot}
                  </div>
                </div>
              </div>
              <div style={{ color: "#666", fontSize: "11px" }}>{a.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
