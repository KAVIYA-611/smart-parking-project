import React, { useState, useEffect } from "react";

const BAR_COLORS = [
  "#00f0ff",
  "#7b2ff7",
  "#00ff88",
  "#ff6b35",
  "#ffd700",
  "#ff4488",
  "#00bfff",
  "#a855f7",
];

function AnimatedBar({ value, max, color, label }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setTimeout(() => setWidth((value / max) * 100), 200);
  }, [value, max]);
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "4px",
        }}
      >
        <span style={{ color: "#aaa", fontSize: "12px" }}>{label}</span>
        <span style={{ color, fontSize: "12px", fontWeight: "bold" }}>
          {value}
        </span>
      </div>
      <div
        style={{
          background: "#111",
          borderRadius: "6px",
          height: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${width}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            borderRadius: "6px",
            transition: "width 1s ease",
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

function DonutChart({ free, occupied, booked }) {
  const total = free + occupied + booked;
  const freePct = (free / total) * 100;
  const occupiedPct = (occupied / total) * 100;
  const bookedPct = (booked / total) * 100;
  const r = 60,
    cx = 80,
    cy = 80,
    circumference = 2 * Math.PI * r;
  let offset = 0;
  const segments = [
    { value: freePct, color: "#00ff88", label: "Free" },
    { value: occupiedPct, color: "#ff4444", label: "Occupied" },
    { value: bookedPct, color: "#ffd700", label: "Booked" },
  ];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        flexWrap: "wrap",
      }}
    >
      <svg width="160" height="160" style={{ transform: "rotate(-90deg)" }}>
        {segments.map((seg, i) => {
          const dash = (seg.value / 100) * circumference;
          const el = (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="20"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={(-offset * circumference) / 100}
              style={{ filter: `drop-shadow(0 0 6px ${seg.color})` }}
            />
          );
          offset += seg.value;
          return el;
        })}
        <circle cx={cx} cy={cy} r="45" fill="#0a0a1f" />
      </svg>
      <div>
        {segments.map((seg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: seg.color,
                boxShadow: `0 0 6px ${seg.color}`,
              }}
            />
            <span style={{ color: "#aaa", fontSize: "13px" }}>
              {seg.label}:{" "}
              <span style={{ color: seg.color, fontWeight: "bold" }}>
                {Math.round(seg.value)}%
              </span>
            </span>
          </div>
        ))}
        <div style={{ color: "#888", fontSize: "12px", marginTop: "8px" }}>
          Total: {total} slots
        </div>
      </div>
    </div>
  );
}

function LineGraph({ data, color, label }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 320,
    h = 100;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * (w - 20) + 10;
      const y = h - 10 - ((v - min) / (max - min || 1)) * (h - 20);
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <div>
      <div style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>
        {label}
      </div>
      <svg
        width={w}
        height={h}
        style={{
          background: "rgba(0,0,0,0.2)",
          borderRadius: "8px",
          border: "1px solid #333",
        }}
      >
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
        {data.map((v, i) => {
          const x = (i / (data.length - 1)) * (w - 20) + 10;
          const y = h - 10 - ((v - min) / (max - min || 1)) * (h - 20);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill={color}
              style={{ filter: `drop-shadow(0 0 3px ${color})` }}
            />
          );
        })}
      </svg>
    </div>
  );
}

function Heatmap() {
  const hours = [
    "12a",
    "2a",
    "4a",
    "6a",
    "8a",
    "10a",
    "12p",
    "2p",
    "4p",
    "6p",
    "8p",
    "10p",
  ];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = days.map(() => hours.map(() => Math.floor(Math.random() * 100)));
  const getColor = (v) => {
    if (v < 20) return "#001a1a";
    if (v < 40) return "#003333";
    if (v < 60) return "#006666";
    if (v < 80) return "#00aaaa";
    return "#00f0ff";
  };
  return (
    <div style={{ overflowX: "auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `60px repeat(${hours.length}, 1fr)`,
          gap: "3px",
          minWidth: "500px",
        }}
      >
        <div />
        {hours.map((h) => (
          <div
            key={h}
            style={{ color: "#666", fontSize: "10px", textAlign: "center" }}
          >
            {h}
          </div>
        ))}
        {days.map((day, di) => (
          <React.Fragment key={day}>
            <div
              style={{
                color: "#888",
                fontSize: "11px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {day}
            </div>
            {data[di].map((v, hi) => (
              <div
                key={hi}
                title={`${v}% occupied`}
                style={{
                  height: "24px",
                  borderRadius: "3px",
                  background: getColor(v),
                  border: `1px solid ${getColor(v)}`,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.2)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "12px",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#666", fontSize: "11px" }}>Low</span>
        {["#001a1a", "#003333", "#006666", "#00aaaa", "#00f0ff"].map((c, i) => (
          <div
            key={i}
            style={{
              width: "20px",
              height: "12px",
              background: c,
              borderRadius: "2px",
            }}
          />
        ))}
        <span style={{ color: "#666", fontSize: "11px" }}>High</span>
      </div>
    </div>
  );
}

export default function AIDashboard() {
  const cities = [
    "Chennai",
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Pune",
    "Kolkata",
    "Kochi",
  ];
  const [liveData, setLiveData] = useState(() =>
    cities.map((c, i) => ({
      city: c,
      free: 100 + i * 30,
      occupied: 80 + i * 20,
      total: 200 + i * 50,
    })),
  );
  const [graphData, setGraphData] = useState(
    Array.from({ length: 12 }, () => Math.floor(Math.random() * 80 + 20)),
  );
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prev) =>
        prev.map((d) => {
          const change = Math.floor(Math.random() * 10) - 5;
          const newFree = Math.max(10, Math.min(d.total - 10, d.free + change));
          return { ...d, free: newFree, occupied: d.total - newFree };
        }),
      );
      setGraphData((prev) => [
        ...prev.slice(1),
        Math.floor(Math.random() * 80 + 20),
      ]);
      setTick((t) => t + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const totalFree = liveData.reduce((a, d) => a + d.free, 0);
  const totalOccupied = liveData.reduce((a, d) => a + d.occupied, 0);
  const totalSlots = liveData.reduce((a, d) => a + d.total, 0);

  return (
    <div
      style={{
        padding: "0",
        color: "#fff",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>

      {/* Live indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#00ff88",
            animation: "pulse 1s infinite",
          }}
        />
        <span
          style={{ color: "#00ff88", fontSize: "13px", fontWeight: "bold" }}
        >
          LIVE — Updates every 2s
        </span>
        <span style={{ color: "#666", fontSize: "12px", marginLeft: "8px" }}>
          Tick #{tick}
        </span>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {[
          {
            label: "Total Slots",
            value: totalSlots,
            color: "#00f0ff",
            icon: "🅿️",
          },
          {
            label: "Free Slots",
            value: totalFree,
            color: "#00ff88",
            icon: "✅",
          },
          {
            label: "Occupied",
            value: totalOccupied,
            color: "#ff4444",
            icon: "🔴",
          },
          {
            label: "Occupancy %",
            value: `${Math.round((totalOccupied / totalSlots) * 100)}%`,
            color: "#ffd700",
            icon: "📊",
          },
          { label: "Cities Live", value: 8, color: "#7b2ff7", icon: "🗺️" },
          { label: "Malls Online", value: 24, color: "#ff6b35", icon: "🏬" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: `rgba(${stat.color === "#00f0ff" ? "0,240,255" : stat.color === "#00ff88" ? "0,255,136" : stat.color === "#ff4444" ? "255,68,68" : "123,47,247"},0.05)`,
              border: `1px solid ${stat.color}44`,
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "28px" }}>{stat.icon}</div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: stat.color,
                margin: "4px 0",
              }}
            >
              {stat.value}
            </div>
            <div style={{ color: "#888", fontSize: "11px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        {/* Bar Chart */}
        <div
          style={{
            background: "rgba(0,240,255,0.03)",
            border: "1px solid rgba(0,240,255,0.2)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <h3
            style={{ color: "#00f0ff", marginBottom: "20px", fontSize: "15px" }}
          >
            📊 City-wise Availability
          </h3>
          {liveData.map((d, i) => (
            <AnimatedBar
              key={d.city}
              value={d.free}
              max={d.total}
              color={BAR_COLORS[i]}
              label={d.city}
            />
          ))}
        </div>

        {/* Donut Chart */}
        <div
          style={{
            background: "rgba(123,47,247,0.03)",
            border: "1px solid rgba(123,47,247,0.2)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <h3
            style={{ color: "#7b2ff7", marginBottom: "20px", fontSize: "15px" }}
          >
            🍩 Overall Distribution
          </h3>
          <DonutChart free={totalFree} occupied={totalOccupied} booked={12} />
        </div>
      </div>

      {/* Line Graph */}
      <div
        style={{
          background: "rgba(0,255,136,0.03)",
          border: "1px solid rgba(0,255,136,0.2)",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "32px",
        }}
      >
        <h3
          style={{ color: "#00ff88", marginBottom: "16px", fontSize: "15px" }}
        >
          📈 Real-time Availability Trend
        </h3>
        <LineGraph
          data={graphData}
          color="#00ff88"
          label="Free slots over time (live)"
        />
      </div>

      {/* Heatmap */}
      <div
        style={{
          background: "rgba(0,240,255,0.03)",
          border: "1px solid rgba(0,240,255,0.2)",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "32px",
        }}
      >
        <h3
          style={{ color: "#00f0ff", marginBottom: "16px", fontSize: "15px" }}
        >
          🌡️ Peak Hours Heatmap
        </h3>
        <p style={{ color: "#888", fontSize: "12px", marginBottom: "16px" }}>
          Hover over cells to see occupancy %
        </p>
        <Heatmap />
      </div>

      {/* AI Predictions */}
      <div
        style={{
          background: "rgba(123,47,247,0.03)",
          border: "1px solid rgba(123,47,247,0.2)",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <h3
          style={{ color: "#7b2ff7", marginBottom: "16px", fontSize: "15px" }}
        >
          🤖 AI Predictions — Next 30 Minutes
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "12px",
          }}
        >
          {liveData.map((d, i) => {
            const trend = Math.random() > 0.5 ? "increasing" : "decreasing";
            return (
              <div
                key={i}
                style={{
                  background: "rgba(123,47,247,0.08)",
                  borderRadius: "10px",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    marginBottom: "6px",
                  }}
                >
                  {d.city}
                </div>
                <div
                  style={{
                    color: trend === "increasing" ? "#ff4444" : "#00ff88",
                    fontSize: "13px",
                  }}
                >
                  {trend === "increasing"
                    ? "📈 Getting crowded"
                    : "📉 Freeing up"}
                </div>
                <div
                  style={{ color: "#888", fontSize: "11px", marginTop: "4px" }}
                >
                  Est. free in 30min:{" "}
                  {Math.floor(d.free * (trend === "increasing" ? 0.8 : 1.2))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
