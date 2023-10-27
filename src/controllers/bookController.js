import book from "../models/Book.js";

class BookController {
  static async listBooks(req, res) {
    try {
      /* Utiliza o modelo "book" para buscar todos os livros na coleção do banco de dados.
      A função "find" do mongoose é usada com um objeto vazio como argumento,
       o que significa que ela retornará todos os documentos da coleção.*/
      const booksList = await book.find({});

      // Envia uma resposta com o status HTTP 200 (OK) e o corpo da resposta contendo a lista de livros no formato JSON.
      res.status(200).send(booksList);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha ao listar livros` });
    }
  }

  static async listBookById(req, res) {
    try {
      const id = req.params.id;
      const bookFound = await book.findById(id);

      res.status(200).send(bookFound);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha ao listar um livro` });
    }
  }

  static async createBook(req, res) {
    try {
      const newBook = await book.create(req.body);
      res.status(201).json({ message: "criado com sucesso", book: newBook });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha ao cadastrar livro` });
    }
  }
}

export default BookController;
