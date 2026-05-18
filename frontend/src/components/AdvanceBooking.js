import React, { useState } from "react";

const locations = [
  {
    name: "Phoenix MarketCity",
    city: "Chennai",
    type: "Mall",
    floors: ["B1", "B2", "GF"],
    pricePerHour: 50,
  },
  {
    name: "Express Avenue",
    city: "Chennai",
    type: "Mall",
    floors: ["B1", "B2"],
    pricePerHour: 40,
  },
  {
    name: "Apollo Hospital",
    city: "Chennai",
    type: "Hospital",
    floors: ["B1", "GF"],
    pricePerHour: 30,
  },
  {
    name: "Chennai Airport",
    city: "Chennai",
    type: "Airport",
    floors: ["P1", "P2", "P3"],
    pricePerHour: 100,
  },
  {
    name: "Orion Mall",
    city: "Bangalore",
    type: "Mall",
    floors: ["B1", "B2", "GF"],
    pricePerHour: 60,
  },
  {
    name: "Lulu Mall",
    city: "Kochi",
    type: "Mall",
    floors: ["B1", "B2", "GF"],
    pricePerHour: 40,
  },
  {
    name: "DLF Mall",
    city: "Delhi",
    type: "Mall",
    floors: ["B1", "B2", "B3"],
    pricePerHour: 80,
  },
  {
    name: "Palladium Mall",
    city: "Mumbai",
    type: "Mall",
    floors: ["B1", "B2"],
    pricePerHour: 100,
  },
  {
    name: "Inorbit Mall",
    city: "Hyderabad",
    type: "Mall",
    floors: ["B1", "B2", "GF"],
    pricePerHour: 50,
  },
  {
    name: "Kochi Airport",
    city: "Kochi",
    type: "Airport",
    floors: ["P1", "P2"],
    pricePerHour: 80,
  },
];

const timeSlots = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

export default function AdvanceBooking({ user }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    city: "",
    location: "",
    floor: "",
    date: "",
    startTime: "",
    duration: 1,
    vehicleNumber: "",
    vehicleType: "Car",
    name: user?.name || "",
  });
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const cities = [...new Set(locations.map((l) => l.city))];
  const cityLocations = locations.filter((l) => l.city === form.city);
  const selectedLocation = locations.find((l) => l.name === form.location);
  const totalAmount = form.duration * (selectedLocation?.pricePerHour || 50);

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const handleConfirm = () => {
    const id = `ADV${Date.now().toString().slice(-8)}`;
    setBookingId(id);
    setConfirmed(true);
  };

  const isStep1Valid = form.city && form.location && form.floor;
  const isStep2Valid = form.date && form.startTime && form.duration;
  const isStep3Valid = form.vehicleNumber && form.name;

  const steps = ["📍 Location", "📅 Date & Time", "🚗 Vehicle", "✅ Confirm"];

  return (
    <div
      style={{
        color: "#fff",
        fontFamily: "'Segoe UI', sans-serif",
        maxWidth: "700px",
      }}
    >
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>

      <h2 style={{ color: "#00f0ff", marginBottom: "4px" }}>
        📅 Advance Slot Booking
      </h2>
      <p style={{ color: "#888", marginBottom: "24px", fontSize: "14px" }}>
        Book your parking slot up to 7 days in advance
      </p>

      {!confirmed ? (
        <>
          {/* Step Indicator */}
          <div style={{ display: "flex", gap: "0", marginBottom: "32px" }}>
            {steps.map((s, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {i < steps.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      left: "50%",
                      right: "-50%",
                      height: "2px",
                      background: i < step - 1 ? "#00f0ff" : "#333",
                      zIndex: 0,
                      transition: "background 0.3s",
                    }}
                  />
                )}
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background:
                      i < step
                        ? "linear-gradient(135deg, #00f0ff, #7b2ff7)"
                        : i === step - 1
                          ? "#00f0ff"
                          : "#333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: i <= step - 1 ? "#000" : "#888",
                    zIndex: 1,
                    boxShadow:
                      i === step - 1 ? "0 0 12px rgba(0,240,255,0.5)" : "none",
                    transition: "all 0.3s",
                  }}
                >
                  {i < step - 1 ? "✓" : i + 1}
                </div>
                <div
                  style={{
                    color:
                      i === step - 1
                        ? "#00f0ff"
                        : i < step - 1
                          ? "#00ff88"
                          : "#888",
                    fontSize: "10px",
                    marginTop: "6px",
                    textAlign: "center",
                    fontWeight: i === step - 1 ? "bold" : "normal",
                  }}
                >
                  {s}
                </div>
              </div>
            ))}
          </div>

          {/* Step 1: Location */}
          {step === 1 && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <h3
                style={{
                  color: "#00f0ff",
                  marginBottom: "20px",
                  fontSize: "16px",
                }}
              >
                📍 Select Location
              </h3>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    color: "#888",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  🏙️ SELECT CITY
                </label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() =>
                        setForm({ ...form, city, location: "", floor: "" })
                      }
                      style={{
                        padding: "8px 16px",
                        background:
                          form.city === city
                            ? "#00f0ff"
                            : "rgba(0,240,255,0.05)",
                        border: `1px solid ${form.city === city ? "#00f0ff" : "rgba(0,240,255,0.3)"}`,
                        color: form.city === city ? "#000" : "#00f0ff",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: form.city === city ? "bold" : "normal",
                      }}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {form.city && (
                <div
                  style={{
                    marginBottom: "16px",
                    animation: "fadeIn 0.3s ease",
                  }}
                >
                  <label
                    style={{
                      color: "#888",
                      fontSize: "12px",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    🏬 SELECT LOCATION
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {cityLocations.map((loc) => (
                      <div
                        key={loc.name}
                        onClick={() =>
                          setForm({ ...form, location: loc.name, floor: "" })
                        }
                        style={{
                          background:
                            form.location === loc.name
                              ? "rgba(0,240,255,0.1)"
                              : "rgba(0,0,0,0.3)",
                          border: `1px solid ${form.location === loc.name ? "#00f0ff" : "#333"}`,
                          borderRadius: "12px",
                          padding: "14px 16px",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          transition: "all 0.2s",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: "14px",
                            }}
                          >
                            {loc.name}
                          </div>
                          <div
                            style={{
                              color: "#888",
                              fontSize: "12px",
                              marginTop: "2px",
                            }}
                          >
                            {loc.type} • ₹{loc.pricePerHour}/hr
                          </div>
                        </div>
                        {form.location === loc.name && (
                          <span style={{ color: "#00f0ff", fontSize: "20px" }}>
                            ✓
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {form.location && selectedLocation && (
                <div
                  style={{
                    marginBottom: "16px",
                    animation: "fadeIn 0.3s ease",
                  }}
                >
                  <label
                    style={{
                      color: "#888",
                      fontSize: "12px",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    🏢 SELECT FLOOR
                  </label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {selectedLocation.floors.map((floor) => (
                      <button
                        key={floor}
                        onClick={() => setForm({ ...form, floor })}
                        style={{
                          padding: "10px 20px",
                          background:
                            form.floor === floor ? "#00f0ff" : "transparent",
                          border: `1px solid ${form.floor === floor ? "#00f0ff" : "rgba(0,240,255,0.3)"}`,
                          color: form.floor === floor ? "#000" : "#00f0ff",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        {floor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!isStep1Valid}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: isStep1Valid
                    ? "linear-gradient(90deg, #00f0ff, #7b2ff7)"
                    : "#333",
                  border: "none",
                  color: isStep1Valid ? "#fff" : "#666",
                  borderRadius: "12px",
                  cursor: isStep1Valid ? "pointer" : "not-allowed",
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginTop: "8px",
                }}
              >
                Next → Date & Time
              </button>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <h3
                style={{
                  color: "#00f0ff",
                  marginBottom: "20px",
                  fontSize: "16px",
                }}
              >
                📅 Select Date & Time
              </h3>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    color: "#888",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  📆 SELECT DATE (Next 7 days)
                </label>
                <input
                  type="date"
                  min={today}
                  max={maxDate}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "rgba(0,240,255,0.05)",
                    border: "1px solid rgba(0,240,255,0.3)",
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    color: "#888",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  ⏰ SELECT START TIME
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gap: "8px",
                  }}
                >
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setForm({ ...form, startTime: time })}
                      style={{
                        padding: "8px 4px",
                        background:
                          form.startTime === time
                            ? "#00f0ff"
                            : "rgba(0,0,0,0.3)",
                        border: `1px solid ${form.startTime === time ? "#00f0ff" : "#333"}`,
                        color: form.startTime === time ? "#000" : "#888",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: form.startTime === time ? "bold" : "normal",
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    color: "#888",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  ⏱️ DURATION
                </label>
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <button
                    onClick={() =>
                      setForm({
                        ...form,
                        duration: Math.max(1, form.duration - 1),
                      })
                    }
                    style={{
                      width: "36px",
                      height: "36px",
                      background: "rgba(0,240,255,0.1)",
                      border: "1px solid rgba(0,240,255,0.3)",
                      color: "#00f0ff",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    −
                  </button>
                  <div
                    style={{
                      flex: 1,
                      textAlign: "center",
                      background: "rgba(0,240,255,0.05)",
                      border: "1px solid rgba(0,240,255,0.3)",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <span
                      style={{
                        color: "#00f0ff",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {form.duration}
                    </span>
                    <span style={{ color: "#888", fontSize: "13px" }}>
                      {" "}
                      hour{form.duration > 1 ? "s" : ""}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setForm({
                        ...form,
                        duration: Math.min(12, form.duration + 1),
                      })
                    }
                    style={{
                      width: "36px",
                      height: "36px",
                      background: "rgba(0,240,255,0.1)",
                      border: "1px solid rgba(0,240,255,0.3)",
                      color: "#00f0ff",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {form.date && form.startTime && (
                <div
                  style={{
                    background: "rgba(0,255,136,0.05)",
                    border: "1px solid rgba(0,255,136,0.2)",
                    borderRadius: "10px",
                    padding: "12px",
                    marginBottom: "16px",
                    fontSize: "13px",
                    animation: "fadeIn 0.3s ease",
                  }}
                >
                  <div style={{ color: "#00ff88", marginBottom: "4px" }}>
                    ✅ Booking Summary
                  </div>
                  <div style={{ color: "#888" }}>
                    📅 {form.date} at {form.startTime} • ⏱️ {form.duration} hr
                    {form.duration > 1 ? "s" : ""}
                  </div>
                  <div
                    style={{
                      color: "#ffd700",
                      marginTop: "4px",
                      fontWeight: "bold",
                    }}
                  >
                    💰 Total: ₹{totalAmount}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "transparent",
                    border: "1px solid #888",
                    color: "#888",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!isStep2Valid}
                  style={{
                    flex: 2,
                    padding: "12px",
                    background: isStep2Valid
                      ? "linear-gradient(90deg, #00f0ff, #7b2ff7)"
                      : "#333",
                    border: "none",
                    color: isStep2Valid ? "#fff" : "#666",
                    borderRadius: "10px",
                    cursor: isStep2Valid ? "pointer" : "not-allowed",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Next → Vehicle Details
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Vehicle */}
          {step === 3 && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <h3
                style={{
                  color: "#00f0ff",
                  marginBottom: "20px",
                  fontSize: "16px",
                }}
              >
                🚗 Vehicle Details
              </h3>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    color: "#888",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  VEHICLE TYPE
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[
                    ["🚗", "Car"],
                    ["🏍️", "Bike"],
                    ["🚙", "SUV"],
                    ["🚐", "Van"],
                  ].map(([icon, type]) => (
                    <button
                      key={type}
                      onClick={() => setForm({ ...form, vehicleType: type })}
                      style={{
                        flex: 1,
                        padding: "12px 8px",
                        background:
                          form.vehicleType === type
                            ? "rgba(0,240,255,0.15)"
                            : "rgba(0,0,0,0.3)",
                        border: `2px solid ${form.vehicleType === type ? "#00f0ff" : "#333"}`,
                        color: form.vehicleType === type ? "#00f0ff" : "#888",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "20px", marginBottom: "4px" }}>
                        {icon}
                      </div>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {[
                { label: "YOUR NAME", key: "name", placeholder: "Full name" },
                {
                  label: "VEHICLE NUMBER",
                  key: "vehicleNumber",
                  placeholder: "TN01AB1234",
                },
              ].map((f) => (
                <div key={f.key} style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      color: "#888",
                      fontSize: "12px",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    {f.label}
                  </label>
                  <input
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={(e) =>
                      setForm({ ...form, [f.key]: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0,240,255,0.3)",
                      borderRadius: "10px",
                      color: "#fff",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "transparent",
                    border: "1px solid #888",
                    color: "#888",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!isStep3Valid}
                  style={{
                    flex: 2,
                    padding: "12px",
                    background: isStep3Valid
                      ? "linear-gradient(90deg, #00f0ff, #7b2ff7)"
                      : "#333",
                    border: "none",
                    color: isStep3Valid ? "#fff" : "#666",
                    borderRadius: "10px",
                    cursor: isStep3Valid ? "pointer" : "not-allowed",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Next → Confirm
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <h3
                style={{
                  color: "#00f0ff",
                  marginBottom: "20px",
                  fontSize: "16px",
                }}
              >
                ✅ Confirm Booking
              </h3>

              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,240,255,0.05), rgba(123,47,247,0.05))",
                  border: "1px solid rgba(0,240,255,0.3)",
                  borderRadius: "16px",
                  padding: "24px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h4 style={{ color: "#00f0ff", margin: 0 }}>
                    Booking Summary
                  </h4>
                  <span
                    style={{
                      background: "rgba(0,255,136,0.1)",
                      border: "1px solid #00ff88",
                      color: "#00ff88",
                      borderRadius: "8px",
                      padding: "4px 12px",
                      fontSize: "12px",
                    }}
                  >
                    Advance Booking
                  </span>
                </div>

                {[
                  ["🏬 Location", form.location],
                  ["🏙️ City", form.city],
                  ["🏢 Floor", form.floor],
                  ["📅 Date", form.date],
                  ["⏰ Time", form.startTime],
                  [
                    "⏱️ Duration",
                    `${form.duration} hour${form.duration > 1 ? "s" : ""}`,
                  ],
                  ["🚗 Vehicle", form.vehicleNumber],
                  ["🚙 Type", form.vehicleType],
                  ["👤 Name", form.name],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      fontSize: "13px",
                    }}
                  >
                    <span style={{ color: "#888" }}>{label}</span>
                    <span style={{ color: "#fff", fontWeight: "bold" }}>
                      {value}
                    </span>
                  </div>
                ))}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "14px 0 0",
                    fontSize: "16px",
                  }}
                >
                  <span style={{ color: "#888" }}>💰 Total Amount</span>
                  <span
                    style={{
                      color: "#ffd700",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    ₹{totalAmount}
                  </span>
                </div>
              </div>

              <div
                style={{
                  background: "rgba(123,47,247,0.05)",
                  border: "1px solid rgba(123,47,247,0.2)",
                  borderRadius: "10px",
                  padding: "12px",
                  marginBottom: "20px",
                  fontSize: "12px",
                }}
              >
                <div
                  style={{
                    color: "#7b2ff7",
                    marginBottom: "6px",
                    fontWeight: "bold",
                  }}
                >
                  🤖 AI Note:
                </div>
                <div style={{ color: "#888" }}>
                  Slot guaranteed 15 mins before your booking time. AI will send
                  reminder 1 hour before. Cancellation free up to 2 hours
                  before.
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => setStep(3)}
                  style={{
                    flex: 1,
                    padding: "13px",
                    background: "transparent",
                    border: "1px solid #888",
                    color: "#888",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleConfirm}
                  style={{
                    flex: 2,
                    padding: "13px",
                    background: "linear-gradient(90deg, #00f0ff, #7b2ff7)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  ✅ Confirm & Pay ₹{totalAmount}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Success Screen */
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            animation: "fadeIn 0.5s ease",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              marginBottom: "16px",
              animation: "float 2s infinite",
            }}
          >
            🎉
          </div>
          <h2
            style={{ color: "#00ff88", fontSize: "24px", marginBottom: "8px" }}
          >
            Booking Confirmed!
          </h2>
          <p style={{ color: "#888", marginBottom: "24px" }}>
            Your advance parking slot is reserved
          </p>

          <div
            style={{
              background: "rgba(0,255,136,0.05)",
              border: "1px solid rgba(0,255,136,0.2)",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "24px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#00ff88",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                🎫 Booking ID
              </span>
              <span
                style={{
                  color: "#ffd700",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {bookingId}
              </span>
            </div>
            {[
              ["🏬", form.location],
              ["📅", `${form.date} at ${form.startTime}`],
              ["🏢", `Floor ${form.floor}`],
              ["🚗", form.vehicleNumber],
              ["💰", `₹${totalAmount} paid`],
            ].map(([icon, value]) => (
              <div
                key={icon}
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "6px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  fontSize: "13px",
                }}
              >
                <span>{icon}</span>
                <span style={{ color: "#fff" }}>{value}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "rgba(123,47,247,0.05)",
              border: "1px solid rgba(123,47,247,0.2)",
              borderRadius: "10px",
              padding: "12px",
              marginBottom: "20px",
              fontSize: "12px",
              color: "#7b2ff7",
            }}
          >
            🤖 AI will send reminder 1 hour before your booking. Slot guaranteed
            15 mins early!
          </div>

          <button
            onClick={() => {
              setConfirmed(false);
              setStep(1);
              setForm({
                city: "",
                location: "",
                floor: "",
                date: "",
                startTime: "",
                duration: 1,
                vehicleNumber: "",
                vehicleType: "Car",
                name: user?.name || "",
              });
            }}
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(90deg, #00f0ff, #7b2ff7)",
              border: "none",
              color: "#fff",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            📅 Book Another Slot
          </button>
        </div>
      )}
    </div>
  );
}
