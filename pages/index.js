import { useState, useEffect } from "react";

export default function Dashboard() {
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [totpCode, setTotpCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetch2FACode = async () => {
    try {
      const response = await fetch("/api/get-2fa-code");
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      if (!data.code) throw new Error("Ongeldig antwoord van server");
      setTotpCode(data.code);
      setShowCode(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching 2FA code:", error);
      setErrorMessage("Er ging iets mis bij het ophalen van de 2FA-code.");
    }
  };

  useEffect(() => {
    if (showCode) {
      const interval = setInterval(fetch2FACode, 30000);
      return () => clearInterval(interval);
    }
  }, [showCode]);

  return (
    <div style={{ backgroundColor: "#0f0f0f", minHeight: "100vh", color: "white", fontFamily: "sans-serif", padding: "2rem" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", color: "#3b82f6" }}>Easy Tools</h1>
        <a href="https://discord.gg/nTY5W9HegZ" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png" alt="Discord" style={{ width: 32, height: 32 }} />
        </a>
      </header>

      <section>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>AutoLogin Guide</h2>
        <ol style={{ lineHeight: "1.8" }}>
          <li>Step 1: Download AdsPower via <a href="https://adspower.com/download" style={{ color: "#60a5fa" }}>https://adspower.com/download</a></li>
          <li>Step 2: Login met:
            <br />
            <strong>Email:</strong> easytools22@gmail.com
            <br />
            <strong>Wachtwoord:</strong> 1RRcGtG0YTSZ5ri
          </li>
          <li>
            Step 3: 
            <button onClick={() => setShow2FAModal(true)} style={{ marginLeft: "1rem", padding: "0.5rem 1rem", backgroundColor: "#3b82f6", border: "none", borderRadius: "6px", color: "white" }}>
              Get 2FA Code
            </button>
          </li>
          <li>Step 4: Open profiel: "All the tools (50+ tools)"</li>
        </ol>
      </section>

      {show2FAModal && (
        <div style={{ backgroundColor: "#000000bb", position: "fixed", inset: 0, display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10 }}>
          <div style={{ background: "#1f2937", padding: "2rem", borderRadius: "8px", textAlign: "center" }}>
            {!showCode ? (
              <>
                <h3>Click to reveal the 2FA code</h3>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <button onClick={fetch2FACode} style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#3b82f6", border: "none", borderRadius: "6px", color: "white" }}>
                  Reveal Code
                </button>
              </>
            ) : (
              <>
                <h3>2FA Verification Code</h3>
                <p style={{ fontSize: "2rem", color: "#22c55e", fontFamily: "monospace", letterSpacing: "4px" }}>{totpCode}</p>
                <p style={{ fontSize: "0.8rem", marginTop: "0.5rem", color: "#aaa" }}>Wordt elke 30 seconden vernieuwd</p>
                <button onClick={() => { setShow2FAModal(false); setShowCode(false); }} style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#3b82f6", border: "none", borderRadius: "6px", color: "white" }}>
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
