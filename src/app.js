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

export default app;
