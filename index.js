// index.js - MINIMO indispensabile per PING
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // NECESSARIO per leggere JSON da n8n

app.post('/ping', (req, res) => {
  console.log("--- PING RICEVUTO ---"); // Messaggio per i log Render
  console.log("Body:", req.body);      // Vediamo cosa arriva
  res.status(200).json({ status: "ok", received: req.body }); // Risposta a n8n
});

app.listen(port, () => {
  console.log(`Server PING pronto sulla porta ${port}`);
});