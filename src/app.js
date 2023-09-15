import express from "express";

const app = express();
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
];

// Função para buscar o livro pelo id
function searchBook(id) {
  return books.findIndex((book) => book.id === id);
}

app.get("/", (req, res) => {
  res.status(200).send("Hello World!!!");
});

app.get("/books", (req, res) => {
  res.status(200).json(books);
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

export default app;
