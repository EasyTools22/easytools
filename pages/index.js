import { useState, useEffect } from "react";

export default function Dashboard() {
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
    <div className="bg-gray-900 min-h-screen text-white font-sans p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-400">Easy Tools</h1>
        <a
          href="https://discord.gg/nTY5W9HegZ"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 p-2 px-3 rounded-full hover:bg-blue-700"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png"
            alt="Discord"
            className="w-6 h-6"
          />
        </a>
      </header>

      <section className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">AutoLogin Guide</h2>

        <div className="mb-6">
          <p className="text-blue-400 font-bold">Step 1:</p>
          <p>
            Download AdsPower Browser from:{" "}
            <a
              href="https://adspower.com/download"
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://adspower.com/download
            </a>
          </p>
        </div>

        <div className="mb-6">
          <p className="text-blue-400 font-bold">Step 2:</p>
          <p className="font-semibold">Login to AdsPower using the following credentials:</p>

          <div className="bg-gray-700 p-4 mt-2 rounded-lg">
            <p className="font-semibold">Email:</p>
            <div className="flex items-center bg-gray-800 p-2 rounded">
              <span className="mr-2">easytools22@gmail.com</span>
              <button
                onClick={() => navigator.clipboard.writeText("easytools22@gmail.com")}
                className="ml-auto bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
              >
                📋 Copy
              </button>
            </div>

            <p className="font-semibold mt-4">Password:</p>
            <div className="flex items-center bg-gray-800 p-2 rounded">
              <span className="mr-2">1RRcGtG0YTSZ5ri</span>
              <button
                onClick={() => navigator.clipboard.writeText("1RRcGtG0YTSZ5ri")}
                className="ml-auto bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
              >
                📋 Copy
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-blue-400 font-bold">Step 3:</p>
          <p>
            Click the below button to see 2FA Verification code. Enter the code that you get in the
            code box and click CONFIRM.
          </p>
          <button
            className="mt-3 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={() => {
              setShow2FAModal(true);
              fetch2FACode();
            }}
          >
            Get 2FA Code
          </button>
        </div>

        <div className="mb-6">
          <p className="text-blue-400 font-bold">Step 4:</p>
          <p>
            Click "Open" on the profile named "All the tools (50+ tools)"
          </p>
        </div>

        {show2FAModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full text-center relative">
              {showCode && !errorMessage ? (
                <>
                  <h3 className="text-xl font-bold mb-4">2FA Verification Code</h3>
                  <p className="text-green-400 text-4xl font-mono tracking-widest">{totpCode}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Code vernieuwt elke 30 seconden automatisch
                  </p>
                  <button
                    onClick={() => {
                      setShow2FAModal(false);
                      setShowCode(false);
                      setTotpCode("");
                    }}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-yellow-400 text-lg font-bold mb-2">⚠️ Confirmation</h3>
                  <p className="mb-4 text-sm">
                    If you are on this page, proceed to see the code. Otherwise, please close.
                  </p>
                  {errorMessage && (
                    <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
                  )}
                  <p className="text-yellow-400 text-sm mb-2">
                    ⚠️ WARNING: Every 30 seconds the code changes
                  </p>
                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      onClick={() => setShow2FAModal(false)}
                      className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={fetch2FACode}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                    >
                      Reveal Code
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
