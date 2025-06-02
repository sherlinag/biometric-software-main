// server/index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 5000;

// Ensure db directory exists
const dbDir = path.join(__dirname, "db");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

// Connect to SQLite database
const dbPath = path.join(dbDir, "devices.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Create table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS device_logins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT,
    username TEXT,
    password TEXT,
    device_info TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;
db.run(createTableQuery);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST /api/login-device
app.post("/api/login-device", async (req, res) => {
  const { ip, username, password } = req.body;

  if (!ip || !username || !password) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const apiUrl = `http://${ip}/ISAPI/System/deviceInfo?format=json&devIndex=8B218013-9AAF-4153-8445-9D83EE25E688`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
      },
    });

    if (!response.ok) {
      return res.status(401).json({ error: "Authentication failed." });
    }

    const data = await response.json();

    const stmt = db.prepare(
      "INSERT INTO device_logins (ip, username, password, device_info) VALUES (?, ?, ?, ?)"
    );
    stmt.run(ip, username, password, JSON.stringify(data));
    stmt.finalize();

    return res.status(200).json({ message: "Login successful.", device: data });
  } catch (error) {
    console.error("Error during device login:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
