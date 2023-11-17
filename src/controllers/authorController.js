import mongoose from "mongoose";
import { author } from "../models/Author.js";

class AuthorController {
  static async listAuthors(req, res) {
    try {
      const authorsList = await author.find({});

      res.status(200).send(authorsList);
    } catch (erro) {
      res.status(500)
        .json({ message: `${erro.message} - falha ao listar autores` });
    }
  }

  static async listAuthorById(req, res) {
    try {
      const id = req.params.id;
      const authorFound = await author.findById(id);

      if (!authorFound) {
        return res.status(404)
          .send({ message: "Autor não encontrado" });
      }

      res.status(200).send(authorFound);
    } catch (erro) {
      if (erro instanceof mongoose.CastError) {
        res.status(400)
          .send({ message: "Id no formato inválido" });
      } else {
        res.status(500)
          .json({ message: `${erro.message} - falha ao listar um Autor` });
      }


    }
  }

  static async createAuthor(req, res) {
    try {
      const newAuthor = await author.create(req.body);
      res.status(201)
        .json({ message: "author criado com sucesso", author: newAuthor });
    } catch (erro) {
      res.status(500)
        .json({ message: `${erro.message} - falha ao cadastrar author` });
    }
  }

  static async updateAuthor(req, res) {
    try {
      const id = req.params.id;
      const updatedAuthor = await author.findByIdAndUpdate(id, req.body, { new: true, });

      if (updatedAuthor) {
        res.status(200)
          .send({ message: "Livro atualizado com sucesso", author: updatedAuthor });
      } else {
        return res.status(404)
          .send({ message: "Livro não encontrado" });
      }
    } catch (erro) {
      res.status(500)
        .json({ message: `${erro.message} - falha ao atualizar um author` });
    }
  }

  static async deleteAuthor(req, res) {
    try {
      const id = req.params.id;
      await author.findByIdAndDelete(id);
      res.status(200)
        .send({ message: "author excluido com sucesso" });
    } catch (erro) {
      res.status(500)
        .json({ message: `${erro.message} - falha ao deletar um author` });
    }
  }
}

export default AuthorController;
