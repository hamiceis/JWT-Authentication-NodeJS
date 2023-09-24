import { Router } from "express";
import { db } from "./db.js";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./middleware/authenticate-token.js"
// Cria uma instância do Router do Express e atribui à constante routerMain.
export const routerMain = Router();

// Define uma rota para uma requisição GET que busca os posts no banco de dados fictício.
// O middleware "authenticateToken" é aplicado a esta rota para autenticar a solicitação.
routerMain.get("/posts", authenticateToken, (req, res) => {
  // Obtém a lista de posts do banco de dados fictício, filtrando por usuário autenticado.
  const posts = db.posts.filter(post => post.username === req.user.name);
  // Retorna os posts como uma resposta no formato JSON.
  return res.json(posts);
});


// Define uma rota para uma requisição POST que cria um token de autenticação JWT.
routerMain.post("/login", (req, res) => {
  // Autentica o usuário.
  
  // Obtém o nome de usuário a partir do corpo (body) da requisição.
  const { username } = req.body;
  // Cria um objeto "user" com o nome de usuário obtido.
  const user = { name: username };

  // Cria um Token de Acesso JWT usando o método "sign" do pacote JWT.
  // Ele recebe três argumentos: o payload (dados a serem codificados), a chave secreta (usada para a assinatura) e opções (opcionais).
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  
  // Retorna o token de acesso como uma resposta no formato JSON.
  return res.json({ accessToken: accessToken });
});
