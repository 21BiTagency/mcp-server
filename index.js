const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('MCP Server is running!');
});

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

app.listen(port, () => {
  console.log(`Server MCP attivo sulla porta ${port}`);
});
