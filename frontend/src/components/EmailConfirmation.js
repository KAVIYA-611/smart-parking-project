import React, { useState } from "react";

export default function EmailConfirmation({ booking, onClose }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [dots, setDots] = useState("");

  const handleSend = () => {
    if (!email) return alert("Email enter panu!");
    setSending(true);
    let d = "";
    const interval = setInterval(() => {
      d = d.length >= 3 ? "" : d + ".";
      setDots(d);
    }, 400);
    setTimeout(() => {
      clearInterval(interval);
      setSending(false);
      setSent(true);
    }, 3000);
  };

  const bookingDetails = booking || {
    slotId: "SLOT-012",
    mallName: "Phoenix MarketCity",
    floor: "B1",
    vehicleNumber: "TN01AB1234",
    duration: 2,
    entryTime: new Date().toLocaleTimeString(),
    amount: 100,
  };

  return (
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
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes checkmark { from{stroke-dashoffset:100} to{stroke-dashoffset:0} }
      `}</style>

      <div
        style={{
          background: "#0a0a1f",
          border: "1px solid rgba(0,240,255,0.3)",
          borderRadius: "20px",
          width: "480px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 0 60px rgba(0,240,255,0.2)",
          animation: "fadeIn 0.3s ease",
        }}
      >
        {!sent ? (
          <>
            {/* Email Preview */}
            <div
              style={{
                background: "linear-gradient(135deg, #0a0a2e, #1a0a3e)",
                borderRadius: "20px 20px 0 0",
                padding: "24px",
                borderBottom: "1px solid rgba(0,240,255,0.2)",
              }}
            >
              {/* Email Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#ff4444",
                  }}
                />
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#ffd700",
                  }}
                />
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#00ff88",
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "4px",
                    padding: "4px 12px",
                    fontSize: "12px",
                    color: "#888",
                    marginLeft: "8px",
                  }}
                >
                  📧 booking-confirmation@smartparking.ai
                </div>
              </div>

              {/* Email Content Preview */}
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                {/* Logo */}
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "20px",
                    paddingBottom: "16px",
                    borderBottom: "1px solid rgba(0,240,255,0.1)",
                  }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "4px" }}>
                    🅿️
                  </div>
                  <div
                    style={{
                      background: "linear-gradient(90deg, #00f0ff, #7b2ff7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    AI Smart Parking India
                  </div>
                  <div
                    style={{
                      color: "#888",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    Booking Confirmation
                  </div>
                </div>

                {/* Success Banner */}
                <div
                  style={{
                    background: "rgba(0,255,136,0.1)",
                    border: "1px solid rgba(0,255,136,0.3)",
                    borderRadius: "10px",
                    padding: "14px",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "6px" }}>
                    ✅
                  </div>
                  <div
                    style={{
                      color: "#00ff88",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Booking Confirmed!
                  </div>
                  <div
                    style={{
                      color: "#888",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    Your parking slot is reserved
                  </div>
                </div>

                {/* QR Code Mock */}
                <div
                  style={{ display: "flex", gap: "16px", marginBottom: "20px" }}
                >
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: "8px",
                      padding: "8px",
                      width: "80px",
                      height: "80px",
                      display: "grid",
                      gridTemplateColumns: "repeat(8, 1fr)",
                      gap: "1px",
                      flexShrink: 0,
                    }}
                  >
                    {Array.from({ length: 64 }, (_, i) => (
                      <div
                        key={i}
                        style={{
                          background: Math.random() > 0.5 ? "#000" : "#fff",
                          borderRadius: "1px",
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        color: "#888",
                        fontSize: "11px",
                        marginBottom: "8px",
                      }}
                    >
                      BOOKING DETAILS
                    </div>
                    {[
                      ["Slot ID", bookingDetails.slotId],
                      ["Mall", bookingDetails.mallName],
                      ["Floor", bookingDetails.floor],
                      ["Vehicle", bookingDetails.vehicleNumber],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "4px",
                        }}
                      >
                        <span style={{ color: "#666", fontSize: "12px" }}>
                          {k}:
                        </span>
                        <span
                          style={{
                            color: "#fff",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* More Details */}
                <div
                  style={{
                    background: "rgba(0,240,255,0.05)",
                    borderRadius: "8px",
                    padding: "14px",
                    marginBottom: "16px",
                  }}
                >
                  {[
                    ["⏰ Entry Time", bookingDetails.entryTime],
                    ["⏱️ Duration", `${bookingDetails.duration} Hour(s)`],
                    ["💰 Amount Paid", `₹${bookingDetails.duration * 50}`],
                    ["📅 Date", new Date().toLocaleDateString()],
                    ["🔖 Booking ID", `BK${Date.now().toString().slice(-8)}`],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "6px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        fontSize: "13px",
                      }}
                    >
                      <span style={{ color: "#888" }}>{k}</span>
                      <span style={{ color: "#fff", fontWeight: "bold" }}>
                        {v}
                      </span>
                    </div>
                  ))}
                </div>

                {/* AI Message */}
                <div
                  style={{
                    background: "rgba(123,47,247,0.1)",
                    border: "1px solid rgba(123,47,247,0.2)",
                    borderRadius: "8px",
                    padding: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      color: "#7b2ff7",
                      fontWeight: "bold",
                      fontSize: "12px",
                      marginBottom: "4px",
                    }}
                  >
                    🤖 AI Assistant Says:
                  </div>
                  <div style={{ color: "#aaa", fontSize: "12px" }}>
                    Traffic is moderate near {bookingDetails.mallName}.
                    Recommended arrival 10 mins early. Your slot will be held
                    for 15 mins after entry time.
                  </div>
                </div>

                {/* Footer */}
                <div
                  style={{
                    textAlign: "center",
                    color: "#555",
                    fontSize: "11px",
                  }}
                >
                  <div>AI Smart Parking India • smartparking.ai</div>
                  <div style={{ marginTop: "4px" }}>
                    Powered by Machine Learning & IoT
                  </div>
                </div>
              </div>
            </div>

            {/* Send Section */}
            <div style={{ padding: "24px" }}>
              <h3
                style={{
                  color: "#00f0ff",
                  marginBottom: "16px",
                  fontSize: "16px",
                }}
              >
                📧 Send Confirmation Email
              </h3>

              {sending ? (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
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
                  <div style={{ color: "#00f0ff", fontWeight: "bold" }}>
                    Sending{dots}
                  </div>
                  <div
                    style={{
                      color: "#888",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    AI encrypting & sending...
                  </div>
                </div>
              ) : (
                <>
                  <input
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0,240,255,0.3)",
                      borderRadius: "10px",
                      color: "#fff",
                      marginBottom: "12px",
                      boxSizing: "border-box",
                      fontSize: "14px",
                    }}
                  />
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      onClick={onClose}
                      style={{
                        flex: 1,
                        padding: "12px",
                        background: "transparent",
                        border: "1px solid #888",
                        color: "#888",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSend}
                      style={{
                        flex: 1,
                        padding: "12px",
                        background: "linear-gradient(90deg, #00f0ff, #7b2ff7)",
                        border: "none",
                        color: "#fff",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      📧 Send Email
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          /* Success */
          <div style={{ padding: "48px 32px", textAlign: "center" }}>
            <div
              style={{
                fontSize: "64px",
                marginBottom: "16px",
                animation: "float 2s infinite",
              }}
            >
              📧
            </div>
            <h3
              style={{
                color: "#00ff88",
                fontSize: "22px",
                marginBottom: "8px",
              }}
            >
              Email Sent!
            </h3>
            <p style={{ color: "#888", marginBottom: "8px" }}>
              Confirmation sent to:
            </p>
            <p
              style={{
                color: "#00f0ff",
                fontWeight: "bold",
                marginBottom: "24px",
              }}
            >
              {email}
            </p>
            <div
              style={{
                background: "rgba(0,255,136,0.05)",
                border: "1px solid rgba(0,255,136,0.2)",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "24px",
                textAlign: "left",
              }}
            >
              {[
                ["📧 Sent to", email],
                ["✅ Status", "Delivered"],
                ["⏰ Time", new Date().toLocaleTimeString()],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "13px",
                  }}
                >
                  <span style={{ color: "#888" }}>{k}</span>
                  <span style={{ color: "#fff" }}>{v}</span>
                </div>
              ))}
            </div>
            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "14px",
                background: "linear-gradient(90deg, #00ff88, #00f0ff)",
                border: "none",
                borderRadius: "12px",
                color: "#000",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Done ✅
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
