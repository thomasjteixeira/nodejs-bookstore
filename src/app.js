import express from "express";
import connectDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";

// Chama a função "connectDataBase" para estabelecer uma conexão com o banco de dados.
// A utilização do "await" indica que esta operação é assíncrona
// O código espera que a conexão seja estabelecida antes de prosseguir.
const connection = await connectDataBase();

// Configura um ouvinte para o evento "error" na conexão.
// Se um erro ocorrer ao tentar se conectar ou durante a conexão, este callback será chamado.
connection.on("error", (erro) => {
  console.log("Erro ao se conectar com o banco de dados! - ", erro);
});

// Configura um ouvinte para o evento "open" na conexão.
// Este callback será chamado uma vez, quando a conexão com o banco de dados for estabelecida com sucesso pela primeira vez.
connection.once("open", () => {
  console.log("Conexão com o banco realizada com sucesso!");
});

const app = express();
routes(app);

app.get("/", (req, res) => {
  res.status(200).send("Hello World!!!");
});

export default app;
