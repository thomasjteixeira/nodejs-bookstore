// Quando temos mais de um export no arquivo, precisamos usar a sintaxe abaixo
import { author } from "../models/Author.js";

class AuthorController {
  static async listAuthors(req, res) {
    try {
      /* Utiliza o modelo "author" para buscar todos os Autores na coleção do banco de dados.
      A função "find" do mongoose é usada com um objeto vazio como argumento,
       o que significa que ela retornará todos os documentos da coleção.*/
      const authorsList = await author.find({});

      // Envia uma resposta com o status HTTP 200 (OK) e o corpo da resposta contendo a lista de authores no formato JSON.
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

      res.status(200).send(authorFound);
    } catch (erro) {
      res.status(500)
        .json({ message: `${erro.message} - falha ao listar um Autor` });
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
