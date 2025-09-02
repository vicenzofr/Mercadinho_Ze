const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;


const db = new sqlite3.Database("Mercadinho_Ze/api/database/mercadinho.db", (err) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err.message);
  } else {
    console.log("Conectado ao banco SQLite!");
  }
});

app.get("/", (req, res) => {
  res.send("API rodando com SQLite!");
});

app.listen(port, () => {
  console.log(`http://localhost:3000`);
});
