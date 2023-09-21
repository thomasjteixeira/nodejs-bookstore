// mongoose, que é uma biblioteca para interagir com MongoDB.
import mongoose from "mongoose";

// dotenv, que é usado para carregar variáveis de ambiente a partir de um arquivo .env.
import dotenv from "dotenv";

// Carrega as variáveis de ambiente a partir do arquivo .env.
dotenv.config();

// Função assíncrona para conectar ao banco de dados MongoDB.
async function connectDataBase() {
  // Constrói a string de conexão usando as variáveis de ambiente.
  // Esta string contém o usuário, a senha e o nome do banco de dados para se conectar ao MongoDB.
  const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@bd1.6asgsar.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
  
  // Usa o método "connect" do mongoose para estabelecer uma conexão com o MongoDB usando a string de conexão.
  mongoose.connect(connectionString);

  // Retorna a conexão estabelecida. 
  // Em aplicações reais, você pode querer adicionar tratamentos de erro ou log de eventos de conexão aqui.
  return mongoose.connection;
}

// Exporta a função para ser usada em outros módulos ou arquivos.
export default connectDataBase;
