// mongoose, que é uma biblioteca para interagir com MongoDB.
import mongoose from "mongoose";

// Função assíncrona para conectar ao banco de dados MongoDB.
async function connectDataBase() {
  // Usa o método "connect" do mongoose para estabelecer uma conexão com o MongoDB usando a string de conexão.
  mongoose.connect(process.env.DB_CONNECTION_STRING);

  // Retorna a conexão estabelecida.
  // Em aplicações reais, você pode querer adicionar tratamentos de erro ou log de eventos de conexão aqui.
  return mongoose.connection;
}

// Exporta a função para ser usada em outros módulos ou arquivos.
export default connectDataBase;
