import express from "express";
import connectDataBase from "./config/dbConnect.js";

// Importa o modelo "book" do módulo "./models/book.js".
// Este modelo permite interagir com a coleção de livros no banco de dados MongoDB.
import book from "./models/book.js";

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

// Cria uma instância do express.
const app = express();

// Configura o express para usar o formato JSON para o corpo das requisições.
app.use(express.json());

const books = [
  {
    id: 1,
    title: "Harry Potter",
  },
  {
    id: 2,
    title: "Senhor dos Anéis",
  },
  {
    id: 3,
    title: "As Crônicas de Gelo e Fogo",
  },
];

// Função para buscar o livro pelo id
function searchBook(id) {
  return books.findIndex((book) => book.id === id);
}

app.get("/", (req, res) => {
  res.status(200).send("Hello World!!!");
});

// Define um endpoint na rota "/books" para o método HTTP GET.
// Quando alguém fizer uma requisição GET para "/books", este código será executado.
app.get("/books", async (req, res) => {

  // Utiliza o modelo "book" para buscar todos os livros na coleção do banco de dados.
  // A função "find" do mongoose é usada com um objeto vazio como argumento,
  // o que significa que ela retornará todos os documentos da coleção.
  const booksList = await book.find({});

  // Envia uma resposta com o status HTTP 200 (OK) e o corpo da resposta contendo a lista de livros no formato JSON.
  res.status(200).json(booksList);
});

app.post("/books", (req, res) => {
  books.push(req.body);
  //res.status(201).json(books);
  res.status(201).json("Livro Cadastrado com Sucesso!!!");
});

app.get("/books/:id", (req, res) => {
  const index = searchBook(Number(req.params.id));

  if (index === -1) {
    res.status(404).json("Livro não encontrado");
  } else {
    res.status(200).json(books[index]);
  }
});

app.patch("/books/:id", (req, res) => {
  const index = searchBook(Number(req.params.id));
  if (index === -1) {
    res.status(404).json("Livro não encontrado");
  } else {
    books[index].title = req.body.title;
    res.status(200).json(books);
  }
});

app.delete("/books/:id", (req, res) => {
  const index = searchBook(Number(req.params.id));
  if (index === -1) {
    res.status(404).json("Livro não encontrado");
  } else {
    books.splice(index, 1);
    //res.status(200).json(books);
    res.status(200).json("Livro removido com sucesso!!!");
  }
});

export default app;
