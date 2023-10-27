import express from "express";
import AuthorController from "../controllers/authorController.js";

const routes = express.Router();

routes.get("/authors", AuthorController.listAuthors);
routes.get("/authors/:id", AuthorController.listAuthorById);
routes.post("/authors", AuthorController.createAuthor);
routes.patch("/authors/:id", AuthorController.updateAuthor);
routes.delete("/authors/:id", AuthorController.deleteAuthor);

export default routes;