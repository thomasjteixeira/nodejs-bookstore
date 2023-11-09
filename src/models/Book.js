import mongoose from "mongoose";

// Define um novo esquema para os livros, utilizando o método "Schema" do mongoose.
// Este esquema descreve a estrutura e os tipos de dados de um documento de livro no banco de dados.
const bookSchema = new mongoose.Schema(
  {
    // Campo "id" para armazenar o identificador único do livro, que é gerado automaticamente pelo MongoDB.
    id: { type: mongoose.Schema.Types.ObjectId },

    // Campo "title" para armazenar o título do livro. É obrigatório, ou seja, todo livro deve ter um título.
    title: { type: String, required: true },
    publisher: { type: String },
    price: { type: Number },
    pages: { type: Number },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'authors', required: true }
  },
  // A opção "versionKey: false" evita que o mongoose adicione o campo "__v" (que é usado para versionamento interno) ao documento.
  { versionKey: false }
);

// Cria e exporta um modelo baseado no esquema definido anteriormente.
// Isso permitirá a criação e a manipulação de documentos de livro no banco de dados.
// O primeiro argumento "books" é o nome do modelo (que determinará o nome da coleção no MongoDB, geralmente no plural).
const book = mongoose.model("books", bookSchema);

// Exporta o modelo "book" para que ele possa ser usado em outras partes do projeto.
export default book;
