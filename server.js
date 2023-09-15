// biblioteca nativa do node
import http from "http";

const PORT = 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World");
});

server.listen(PORT, () => {
  console.log("Servidor rodando na porta 3000");
});
