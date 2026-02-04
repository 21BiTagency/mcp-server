const express = require("express");
const app = express();

// health check per Render
app.get("/health", (req, res) => {
  res.send("ok");
});

// necessario per leggere JSON
app.use(express.json());

// endpoint comandi cliente
app.post("/cmd/client", (req, res) => {
  console.log("CMD CLIENT:", req.body);
  res.json({ status: "received" });
});

// avvio server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server up on port " + PORT);
});
