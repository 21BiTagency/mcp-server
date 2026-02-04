const express = require("express");
const app = express();

app.get("/health", (req, res) => {
  res.send("ok");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server up on port " + PORT);
});
