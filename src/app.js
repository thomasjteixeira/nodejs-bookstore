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
