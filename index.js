const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Test base
app.get("/", (req, res) => {
  res.send("✅ MCP Server attivo");
});

// Crea file
app.post("/crea-file", (req, res) => {
  const { nome, contenuto } = req.body;
  const path = `${nome}.txt`;
  fs.writeFile(path, contenuto, (err) => {
    if (err) return res.status(500).send({ errore: err });
    res.send({ messaggio: "📄 File creato con successo", path });
  });
});

// Genera report (mock)
app.post("/genera-report", (req, res) => {
  const { dati } = req.body;
  const risposta = {
    messaggio: "📊 Report generato",
    riepilogo: dati.map((item, i) => `${i + 1}. ${item}`).join("\n"),
  };
  res.send(risposta);
});

app.listen(port, () => {
  console.log(`🚀 Server MCP in ascolto su porta ${port}`);
});
