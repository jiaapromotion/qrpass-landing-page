
// ✅ server.js (Render Backend) - Add this to your existing server
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// 🧩 Proxy endpoint to bypass CORS for Google Sheets logging
app.post('/submit-lead', async (req, res) => {
  const googleScriptURL = "https://script.google.com/macros/s/AKfycbz0B1mfxi5V9Sz40Oto98WdqoQT7BAk6wqnMmimf18M9VTMGKp1EbElTQ9sxKqKgYZf2g/exec";

  try {
    const response = await fetch(googleScriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const result = await response.text();
    res.status(200).send(result);
  } catch (err) {
    console.error('❌ Lead submission failed:', err);
    res.status(500).send('Something went wrong');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
