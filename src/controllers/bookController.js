import book from "../models/Book.js";
import { author } from "../models/Author.js";

class BookController {
  static async listBooks(req, res) {
    try {
      /* Utiliza o modelo "book" para buscar todos os livros na coleção do banco de dados.
      A função "find" do mongoose é usada com um objeto vazio como argumento,
       o que significa que ela retornará todos os documentos da coleção.*/
      const booksList = await book.find({}).populate('author');

      // Envia uma resposta com o status HTTP 200 (OK) e o corpo da resposta contendo a lista de livros no formato JSON.
      res.status(200).send(booksList);
    } catch (erro) {
      res.status(500)
        .json({ message: `${erro.message} - falha ao listar livros` });
    }
  }

  static async listBookById(req, res) {
    try {
      const id = req.params.id;
      const bookFound = await book.findById(id).populate('author');

      res.status(200).send(bookFound);
    } catch (erro) {
      res.status(500)
        .json({ message: `${erro.message} - falha ao listar um livro` });
    }
  }

  static async listBookBySearch(req, res) {
    try {
      const searchList = await searchParameters(req.query);

      const { limit = 5, page = 1 } = req.query;

      if (searchList) {
        const bookFound = await book.find(searchList)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('author');
        
        res.status(200).send(bookFound);
      }else {
        res.status(404).send({ message: "Autor não encontrado" });
      }

    } catch (erro) {
      res.status(500)
        .json({ message: `${erro.message} - falha ao buscar os livros` });
    }
  }

  static async createBook(req, res) {
    try {
      const newBook = await book.create(req.body);
      res.status(201)
        .json({ message: "Livro criado com sucesso", book: newBook });
    } catch (erro) {
      res.status(500)
        .json({ message: `${erro.message} - falha ao cadastrar livro` });
    }
  }

  static async updateBook(req, res) {
    try {
      const id = req.params.id;
      const updatedBook = await book.findByIdAndUpdate(id, req.body, { new: true, });

      if (updatedBook) {
        res.status(200)
          .send({ message: "Livro atualizado com sucesso", book: updatedBook });
      } else {
        return res.status(404)
          .send({ message: "Livro não encontrado" });
      }
    } catch (erro) {
      res.status(500)
        .json({ message: `${erro.message} - falha ao atualizar um livro` });
    }
  }

  static async deleteBook(req, res) {
    try {
      const id = req.params.id;
      await book.findByIdAndDelete(id);
      res.status(200)
        .send({ message: "Livro excluido com sucesso" });
    } catch (erro) {
      res.status(500)
        .json({ message: `${erro.message} - falha ao deletar um livro` });
    }
  }
}

async function searchParameters(query) {
  const { title, publisher, minPages, maxPages, minPrice, maxPrice, authorName } = query;

  let searchList = {};

  if (title) searchList.title = { $regex: title, $options: 'i' };
  if (publisher) searchList.publisher = { $regex: publisher, $options: 'i' };

  if (minPages) searchList.pages = { ...searchList.pages, $gte: minPages };
  if (maxPages) searchList.pages = { ...searchList.pages, $lte: maxPages };

  if (minPrice) searchList.price = { ...searchList.price, $gte: minPrice };
  if (maxPrice) searchList.price = { ...searchList.price, $lte: maxPrice };

  if (authorName) {
    const authorFound = await author.findOne({ name: authorName })

    if (authorFound) {
      searchList.author = authorFound._id;
    } else {
      searchList = null;
    }

  }

  return searchList;
}

export default BookController;
