const express = require("express");
const app = express();

app.use(express.json());

// health check
app.get("/health", (req, res) => {
  res.send("ok");
});

// forward verso n8n
app.post("/cmd/client", async (req, res) => {
  try {
    await fetch(process.env.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    res.json({ status: "forwarded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server up on port " + PORT);
});
