import express from "express";
import BookController from "../controllers/bookController.js";

const routes = express.Router();

routes.get("/books", BookController.listBooks);
routes.get("/books/:id", BookController.listBookById);
routes.post("/books", BookController.createBook);
routes.patch("/books/:id", BookController.updateBook);

export default routes;