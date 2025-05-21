import { useState } from "react";

export default function Dashboard() {
  const [copied, setCopied] = useState({ email: false, password: false });

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied({ ...copied, [type]: true });
      setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
    });
  };

  return (
    <div style={{ backgroundColor: '#111', color: '#fff', fontFamily: 'Arial, sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <img src="/discord.png" alt="Discord" style={{ width: 120, marginBottom: '1rem' }} />
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AutoLogin Guide</h2>

      <p><strong>Step 1:</strong> Download AdsPower Browser from: <a href="https://adspower.com/download" style={{ color: '#4f8cff' }}>https://adspower.com/download</a></p>

      <p><strong>Step 2:</strong> Login to AdsPower using the following credentials:</p>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Email:</strong> easytools22@gmail.com
        <button onClick={() => handleCopy('easytools22@gmail.com', 'email')} style={{ marginLeft: 10, backgroundColor: '#4f8cff', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: 4 }}>
          {copied.email ? "Copied!" : "Copy"}
        </button>
      </div>
      <div>
        <strong>Password:</strong> 1RRcGtG0YTSZ5ri
        <button onClick={() => handleCopy('1RRcGtG0YTSZ5ri', 'password')} style={{ marginLeft: 10, backgroundColor: '#4f8cff', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: 4 }}>
          {copied.password ? "Copied!" : "Copy"}
        </button>
      </div>

      <p style={{ marginTop: '1rem' }}><strong>Step 3:</strong> Click the below button to see 2FA Verification code. Enter the code that you get in the code box and click CONFIRM.</p>
      <button style={{ backgroundColor: '#4f8cff', color: '#fff', padding: '10px 20px', borderRadius: 6, border: 'none' }}>
        Get 2FA Code
      </button>

      <p style={{ marginTop: '1rem' }}><strong>Step 4:</strong> Click "Open" on the profile named "All the tools (50+ tools)"</p>
    </div>
  );
}