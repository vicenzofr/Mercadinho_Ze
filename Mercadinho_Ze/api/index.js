const express = require("express");
const SQLiteLite = require("sqlite");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors") //para fazer a "liberacao" das portas do front http://127.0.0.1:5500 para o back end que é http://localhost:3000
const app = express();
const port = 3000;
let db 

async function inicializarBD() {
  // Cria a pasta 'database' se não existir
  const fs = require("fs");
  const path = "./database";
  if (!fs.existsSync(path)) fs.mkdirSync(path);

  db = await SQLiteLite.open({
    filename: "./database/mercadinho.db",
    driver: sqlite3.Database,
  });

 // Cria a tabela produtos se não existir
  await db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      quantidade INTEGER NOT NULL
    )
  `);
  
  console.log("Banco e tabela inicializados!");
}

inicializarBD()

// const db = new sqlite3.Database("./database/mercadinho.db", (err) => {
//   if (err) {
//     console.error("Erro ao conectar no banco:", err.message);
//   } else {
//     console.log("Conectado ao banco SQLite!");
//   }
// });

// app.use(express.json())
// app.use(cors({
//   // origin: "http://127.0.0.1:5500"
//   origin: "*"
// }))

app.use(express.json())
app.use(cors());// aqui eu consigo liberar todas as APIs sem precisar baixar o cors nos pcs 

app.use(express.json({ limit: '50mb'})); //declara o tipo de objeto 

app.get("/", (req, res) => {
  res.send("API rodando com SQLite!");
});

fetch('/api/gerar-pdf', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(carrinho)
});

app.post("/product",async(req, res) => {
  // const body = req.body
  // const nome = body.nome
  // const preco = body.preco
  // const quantidade = body.quantidade
  // let status

  const { nome, valor, quant } = req.body;
  const dbResponse = await db.run(`INSERT INTO produtos(nome, preco, quantidade) VALUES(?, ?, ?)`, [nome, valor, quant])
  
  return res.json(dbResponse)
})


app.get("/products", async(req, res) => {
  const products = await db.all("SELECT * FROM produtos")
  return res.json(products)
})

app.get("/product/:id", async(req, res)=>{
  const productId = await db.get("SELECT * FROM produtos WHERE id=?", req.params.id)
  return res.json(productId)
})

app.delete("/product/delete/:id", async(req, res) =>{
  const id = req.params.id
  const productId = await db.get("SELECT * FROM produtos WHERE id=?", id)
  
  if(!productId){
    console.log("ID invalido")
    return res.status(404).send("Produto nao encontrado")
  }else{
    await db.run("DELETE FROM produtos WHERE id=?", id)
    return res.status(200).send("Produto deletado com sucesso")
  }

  //400 erro
  //201 criado 
  //200 sucesso
  
})

app.listen(port, () => {
  console.log(`http://localhost:3000`);
});
