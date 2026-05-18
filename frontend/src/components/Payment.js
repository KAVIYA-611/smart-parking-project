import React, { useState } from "react";

export default function Payment({ booking, onSuccess, onClose }) {
  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [step, setStep] = useState("select");
  const [processing, setProcessing] = useState(false);
  const [dots, setDots] = useState("");

  const amount = (booking?.duration || 1) * 50;

  const handlePay = () => {
    if (method === "upi" && !upiId) return alert("UPI ID enter panu!");
    if (method === "card" && (!card.number || !card.expiry || !card.cvv))
      return alert("Card details enter panu!");
    setProcessing(true);
    let d = "";
    const interval = setInterval(() => {
      d = d.length >= 3 ? "" : d + ".";
      setDots(d);
    }, 400);
    setTimeout(() => {
      clearInterval(interval);
      setProcessing(false);
      setStep("success");
    }, 3000);
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
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes successPop { 0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>

      <div
        style={{
          background: "#0a0a1f",
          border: "1px solid rgba(0,240,255,0.3)",
          borderRadius: "20px",
          padding: "32px",
          width: "420px",
          boxShadow: "0 0 60px rgba(0,240,255,0.2)",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {step !== "success" && (
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "transparent",
              border: "none",
              color: "#888",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        )}

        {/* STEP 1: SELECT & PAY */}
        {step === "select" && !processing && (
          <>
            <h3
              style={{
                color: "#00f0ff",
                marginBottom: "4px",
                fontSize: "20px",
              }}
            >
              💳 Payment Gateway
            </h3>
            <p
              style={{ color: "#888", fontSize: "13px", marginBottom: "24px" }}
            >
              Secure AI-encrypted payment
            </p>

            {/* Amount */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,240,255,0.1), rgba(123,47,247,0.1))",
                border: "1px solid rgba(0,240,255,0.3)",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              <div
                style={{ color: "#888", fontSize: "13px", marginBottom: "4px" }}
              >
                Total Amount
              </div>
              <div
                style={{
                  color: "#00f0ff",
                  fontSize: "36px",
                  fontWeight: "bold",
                }}
              >
                ₹{amount}
              </div>
              <div
                style={{ color: "#888", fontSize: "12px", marginTop: "4px" }}
              >
                {booking?.mallName} • {booking?.slotId} • {booking?.duration}hr
              </div>
            </div>

            {/* Method Tabs */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
              {[
                { id: "upi", icon: "📱", label: "UPI" },
                { id: "card", icon: "💳", label: "Card" },
                { id: "wallet", icon: "👛", label: "Wallet" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background:
                      method === m.id
                        ? "rgba(0,240,255,0.15)"
                        : "rgba(255,255,255,0.03)",
                    border: `2px solid ${method === m.id ? "#00f0ff" : "#ffffff22"}`,
                    borderRadius: "12px",
                    color: method === m.id ? "#00f0ff" : "#888",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: method === m.id ? "bold" : "normal",
                  }}
                >
                  <div style={{ fontSize: "20px", marginBottom: "4px" }}>
                    {m.icon}
                  </div>
                  {m.label}
                </button>
              ))}
            </div>

            {/* UPI */}
            {method === "upi" && (
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    color: "#888",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  UPI ID
                </label>
                <input
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(0,240,255,0.3)",
                    borderRadius: "10px",
                    color: "#fff",
                    boxSizing: "border-box",
                    fontSize: "14px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                    <button
                      key={app}
                      onClick={() => setUpiId(`user@${app.toLowerCase()}`)}
                      style={{
                        padding: "6px 12px",
                        background: "rgba(0,240,255,0.05)",
                        border: "1px solid rgba(0,240,255,0.2)",
                        borderRadius: "8px",
                        color: "#00f0ff",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      {app}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Card */}
            {method === "card" && (
              <div style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #1a1a3e, #2d1b69)",
                    borderRadius: "16px",
                    padding: "20px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      color: "#888",
                      fontSize: "11px",
                      marginBottom: "12px",
                    }}
                  >
                    SMART PARKING CARD
                  </div>
                  <div
                    style={{
                      color: "#fff",
                      fontSize: "18px",
                      letterSpacing: "3px",
                      fontFamily: "monospace",
                      marginBottom: "16px",
                    }}
                  >
                    {card.number
                      ? card.number.replace(/(\d{4})/g, "$1 ").trim()
                      : "•••• •••• •••• ••••"}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <div style={{ color: "#888", fontSize: "10px" }}>
                        CARD HOLDER
                      </div>
                      <div style={{ color: "#fff", fontSize: "13px" }}>
                        {card.name || "YOUR NAME"}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: "#888", fontSize: "10px" }}>
                        EXPIRES
                      </div>
                      <div style={{ color: "#fff", fontSize: "13px" }}>
                        {card.expiry || "MM/YY"}
                      </div>
                    </div>
                  </div>
                </div>
                <input
                  placeholder="Card Number"
                  maxLength={16}
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(0,240,255,0.2)",
                    borderRadius: "8px",
                    color: "#fff",
                    marginBottom: "10px",
                    boxSizing: "border-box",
                    fontSize: "13px",
                  }}
                />
                <input
                  placeholder="Card Holder Name"
                  value={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(0,240,255,0.2)",
                    borderRadius: "8px",
                    color: "#fff",
                    marginBottom: "10px",
                    boxSizing: "border-box",
                    fontSize: "13px",
                  }}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    placeholder="MM/YY"
                    maxLength={5}
                    value={card.expiry}
                    onChange={(e) =>
                      setCard({ ...card, expiry: e.target.value })
                    }
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0,240,255,0.2)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "13px",
                    }}
                  />
                  <input
                    placeholder="CVV"
                    maxLength={3}
                    type="password"
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0,240,255,0.2)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "13px",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Wallet */}
            {method === "wallet" && (
              <div style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                  }}
                >
                  {[
                    { name: "Paytm", balance: "₹250", color: "#00baf2" },
                    { name: "Amazon Pay", balance: "₹180", color: "#ff9900" },
                    { name: "Mobikwik", balance: "₹320", color: "#7b2ff7" },
                    { name: "Freecharge", balance: "₹90", color: "#00f0ff" },
                  ].map((w) => (
                    <div
                      key={w.name}
                      onClick={() => setUpiId(w.name)}
                      style={{
                        background:
                          upiId === w.name
                            ? `${w.color}22`
                            : "rgba(255,255,255,0.03)",
                        border: `1px solid ${upiId === w.name ? w.color : w.color + "44"}`,
                        borderRadius: "10px",
                        padding: "12px",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          color: w.color,
                          fontWeight: "bold",
                          fontSize: "13px",
                        }}
                      >
                        {w.name}
                      </div>
                      <div
                        style={{
                          color: "#888",
                          fontSize: "11px",
                          marginTop: "4px",
                        }}
                      >
                        Balance: {w.balance}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                padding: "10px",
                background: "rgba(0,255,136,0.05)",
                borderRadius: "8px",
                border: "1px solid rgba(0,255,136,0.2)",
              }}
            >
              <span>🔒</span>
              <span style={{ color: "#00ff88", fontSize: "12px" }}>
                256-bit AI encrypted • 100% secure
              </span>
            </div>

            <button
              onClick={handlePay}
              style={{
                width: "100%",
                padding: "14px",
                background: "linear-gradient(90deg, #00f0ff, #7b2ff7)",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Pay ₹{amount} →
            </button>
          </>
        )}

        {/* STEP 2: PROCESSING */}
        {processing && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                border: "3px solid rgba(0,240,255,0.2)",
                borderTop: "3px solid #00f0ff",
                borderRadius: "50%",
                margin: "0 auto 20px",
                animation: "spin 1s linear infinite",
              }}
            />
            <div
              style={{ color: "#00f0ff", fontSize: "18px", fontWeight: "bold" }}
            >
              Processing{dots}
            </div>
            <div style={{ color: "#888", fontSize: "13px", marginTop: "8px" }}>
              AI verifying payment...
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                marginTop: "20px",
              }}
            >
              {["🔐 Encrypting", "🤖 Verifying", "✅ Confirming"].map(
                (s, i) => (
                  <div
                    key={i}
                    style={{
                      color: "#00f0ff44",
                      fontSize: "11px",
                      padding: "4px 8px",
                      border: "1px solid rgba(0,240,255,0.1)",
                      borderRadius: "6px",
                    }}
                  >
                    {s}
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS */}
        {step === "success" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div
              style={{
                fontSize: "64px",
                marginBottom: "16px",
                animation: "successPop 0.5s ease, float 2s infinite 0.5s",
              }}
            >
              ✅
            </div>
            <h3
              style={{
                color: "#00ff88",
                fontSize: "22px",
                marginBottom: "8px",
              }}
            >
              Payment Successful!
            </h3>
            <p
              style={{ color: "#888", fontSize: "14px", marginBottom: "24px" }}
            >
              ₹{amount} paid successfully
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
                ["Transaction ID", `TXN${Date.now()}`],
                ["Amount", `₹${amount}`],
                ["Slot", booking?.slotId],
                ["Mall", booking?.mallName],
                ["Status", "✅ Confirmed"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: "1px solid #ffffff11",
                    fontSize: "13px",
                  }}
                >
                  <span style={{ color: "#888" }}>{k}</span>
                  <span
                    style={{
                      color: "#fff",
                      fontFamily:
                        k === "Transaction ID" ? "monospace" : "inherit",
                      fontSize: k === "Transaction ID" ? "11px" : "13px",
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                onSuccess();
              }}
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
              Get Email Confirmation 📧
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
