// dotenv, que é usado para carregar variáveis de ambiente a partir de um arquivo .env.
import "dotenv/config";
import app from "./src/app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta 3000");
});
