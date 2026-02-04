const express = require("express");
const app = express();

// necessario per leggere JSON
app.use(express.json());

// health check per Render
app.get("/health", (req, res) => {
  res.send("ok");
});

// endpoint comandi cliente → inoltra a n8n
app.post("/cmd/client", async (req, res) => {
  console.log("CMD CLIENT:", req.body);

  await fetch(process.env.N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });

  res.json({ status: "forwarded" });
});

// avvio server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server up on port " + PORT);
});
