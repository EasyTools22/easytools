
import { useState, useEffect } from "react";

export default function Home() {
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [totpCode, setTotpCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetch2FACode = async () => {
    try {
      const response = await fetch("/api/get-2fa-code");
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      if (!data.code) {
        throw new Error("Ongeldig antwoord van server");
      }
      setTotpCode(data.code);
      setShowCode(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching 2FA code:", error);
      setErrorMessage("Er ging iets mis bij het ophalen van de 2FA-code. Probeer het later opnieuw.");
    }
  };

  useEffect(() => {
    if (showCode) {
      const interval = setInterval(fetch2FACode, 30000);
      return () => clearInterval(interval);
    }
  }, [showCode]);

  return (
    <div>
      <h1>Easy Tools Dashboard</h1>
      <button onClick={() => setShow2FAModal(true)}>Get 2FA Code</button>
      {show2FAModal && (
        <div>
          {!showCode ? (
            <>
              <p>Click below to reveal the 2FA code</p>
              <button onClick={fetch2FACode}>Reveal Code</button>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </>
          ) : (
            <>
              <p>2FA Code: <strong>{totpCode}</strong></p>
              <button onClick={() => { setShow2FAModal(false); setShowCode(false); setTotpCode(""); }}>Close</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
