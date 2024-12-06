// server.js
const express = require('express');
const admin = require('firebase-admin');
const { sendNotificationToAllDevices, sendNotificationToMultipleDevices } = require('./firebase-notifications');

// Initialize Firebase Admin
// You'll need to replace this with your actual service account key
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(express.json());

// Test endpoint for single notification
app.post('/notify/all', async (req, res) => {
  try {
    const { title, body, data } = req.body;
    const result = await sendNotificationToAllDevices({ title, body, data });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test endpoint for multiple notifications
app.post('/notify/multiple', async (req, res) => {
  try {
    const { title, body, data } = req.body;
    const result = await sendNotificationToMultipleDevices({ title, body, data });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});