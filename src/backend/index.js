const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookies = require("cookie-parser");
const routes = require("./routes/routes");
const database = require("./database/models");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.disable("x-powered-by");

// Middleware para habilitar CORS e permitir credenciais
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Configuração das opções CORS para permitir solicitações de origem local
const corsOptions = {
  origin: ["http://localhost:5173"], // Permite apenas solicitações de http://localhost
  methods: ["GET", "POST", "PUT"], // Permite os métodos HTTP GET e POST
  optionsSuccessStatus: 204, // Define o código de status de sucesso para respostas de opções
};

app.use(cors(corsOptions));

app.use(cookies());

// carrega todas as rotas
routes(app);

// valida se o banco de dados está conectado
database.sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((error) => {
    console.error("Não foi possível conectar ao banco de dados:", error);
  });

// Inicie o servidor na porta 3000
app.listen(PORT, () => {
  console.log(`Servidor A.S.A.S na porta ${PORT}`);
});
