const express = require("express");
const SQLiteLite = require("sqlite");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors"); //para fazer a "liberacao" das portas do front http://127.0.0.1:5500 para o back end que é http://localhost:3000
// const { PasswordCrypto } = require("./PassowordCrypto.ts");
const { PasswordCrypto } = require("./users/PassowordCrypto.ts");
const bcrypt = require("bcryptjs");
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

//  Cria a tabela produtos se não existir
  await db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      quantidade INTEGER NOT NULL,
      img TEXT
    )
  `);

   await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      password TEXT NOT NULL
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

// app.use(express.json())
// app.use(cors());// aqui eu consigo liberar todas as APIs sem precisar baixar o cors nos pcs 

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]// aqui eu consigo liberar todas as APIs sem precisar baixar o cors nos pcs 
}));

app.use(express.json({ limit: '50mb'})); //declara o tipo de objeto 

app.get("/", (req, res) => {
  res.send("API rodando com SQLite!");
});


// USUARIOS

app.post("/users", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await PasswordCrypto.hashPassword(password);
    const dbResponse = await db.run(
      `INSERT INTO users(email, password) VALUES(?, ?)`,
      [email, hashedPassword]
    );

    return res.json({ id: dbResponse.lastID, email });
  } catch (error) {
    console.error("Caught error in event handler:", error);
    return res.status(500).json({ error: "Erro ao registrar usuário" });
  }
})

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
    }

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email.trim().toLowerCase()]);
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const ok = await bcrypt.compare(password, user.password); // user.password deve ser HASH
    if (!ok) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    return res.json({ success: true, user: { id: user.id, email: user.email } });
  } catch (e) {
    console.error("Erro /login:", e); // <— logue para ver a mensagem real
    return res.status(500).json({ message: "Erro no servidor" });
  }
});


app.get("/users", async(req, res) => {
  const users = await db.all("SELECT * FROM users")
  return res.json(users)
})

app.get("/users/:id", async(req, res)=>{
  const userId = await db.get("SELECT * FROM users WHERE id=?", req.params.id)
  return res.json(userId)
})

app.delete("/user/delete/:id", async(req, res) =>{
  const id = req.params.id
  const userId = await db.get("SELECT * FROM users WHERE id=?", id)
  
  if(!userId){
    console.log("ID invalido")
    return res.status(404).send("Usuario nao encontrado")
  }else{
    await db.run("DELETE FROM users WHERE id=?", id)
    return res.status(200).send("Usuario deletado com sucesso")
  }
})



// PRODUTOS

app.post("/product",async(req, res) => {
  // const body = req.body
  // const nome = body.nome
  // const preco = body.preco
  // const quantidade = body.quantidade
  // let status

  try {
    
    const { nome, valor, quant, img } = req.body;
    // console.log("teste back",img)
    const dbResponse = await db.run(`INSERT INTO produtos(nome, preco, quantidade, img) VALUES(?, ?, ?, ?)`, [nome, valor, quant, img]);
    // Code that might throw an error
    // console.log(someUndefinedVariable); 
      return res.json(req.body)
  } catch (error) {
    debugger;
    console.error("Caught error in event handler:", error);
    // Handle the error, e.g., display a message to the user
  }
})

app.get("/products", async(req, res) => {
  const products = await db.all("SELECT * FROM produtos")
  return res.json(products)
})

app.get("/product/:id", async(req, res)=>{
  const productId = await db.get("SELECT * FROM produtos WHERE id=?", req.params.id)
  return res.json(productId)
})

app.get("/product/quant/:id", async (req, res) => {
  const productQuant = await db.get(
    "SELECT quantidade FROM produtos WHERE id = ?",
    [req.params.id]
  );
  return res.json(productQuant);
});


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
