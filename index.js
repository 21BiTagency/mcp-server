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
app.use(bodyParser.json());

app.post('/genera-report', (req, res) => {
  try {
    const { dati } = req.body;
    if (!Array.isArray(dati)) {
      return res.status(400).send({ error: "Il campo 'dati' deve essere un array." });
    }
    const risposta = {
      messaggio: '📄 Report generato',
      riepilogo: dati.map((item, i) => `${i + 1}. ${item}`).join('\n')
    };
    res.send(risposta);
  } catch (error) {
    res.status(500).send({ error: "Errore interno nel server.", details: error.message });
  }
});
log(`🚀 Server MCP in ascolto su porta ${port}`);
});
