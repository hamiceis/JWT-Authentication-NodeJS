import { Router } from "express"; // Importa o objeto 'Router' da biblioteca Express para criar rotas.
import jwt from "jsonwebtoken"; // Importa a biblioteca 'jsonwebtoken' para trabalhar com tokens JWT.
import { generateAccessToken } from "./generateAccessToken.js"

export const authRouter = Router(); // Cria uma instância do router para as rotas de autenticação.

let refreshTokens = []; // Inicializa um array vazio para armazenar tokens de atualização.

authRouter.post("/token", (req, res) => {
  // Define uma rota para a requisição POST que lida com a obtenção de um novo token de acesso usando um token de atualização.
  const refreshToken = req.body.token; // Obtém o token de atualização do corpo da requisição.
  if (refreshToken === null) return res.sendStatus(401); // Verifica se o token de atualização está ausente e envia uma resposta de status 401 (Não Autorizado) se estiver ausente.
  if (!refreshTokens.includes(refreshToken)) {
    // Verifica se o token de atualização não está na lista de tokens de atualização válidos.
    return res.status(403).send("Token não encontrado"); // Envia uma resposta de status 403 (Proibido) se o token de atualização não for encontrado.
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    // Verifica a validade do token de atualização usando a chave secreta 'REFRESH_TOKEN_SECRET'.
    if (err) return res.sendStatus(403); // Envia uma resposta de status 403 (Proibido) se a verificação do token falhar.
    const accessToken = generateAccessToken({ name: payload.name }); // Gera um novo token de acesso com base nas informações do usuário do payload do token de atualização.
    res.json({ accessToken: accessToken }); // Envia o novo token de acesso como resposta no formato JSON.
  });
});

authRouter.delete('/logout', (req, res) => {  
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.status(204).send("Token removido")
})

authRouter.post('/login', (req, res) => {
  // Define uma rota para a requisição POST que lida com o processo de login.
  const username = req.body.username; // Obtém o nome de usuário do corpo da requisição.
  const user = { name: username }; // Cria um objeto 'user' com o nome de usuário obtido.
  
  const accessToken = generateAccessToken(user); // Gera um novo token de acesso com base nas informações do usuário.
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET); // Gera um novo token de atualização com base nas informações do usuário e na chave secreta 'REFRESH_TOKEN_SECRET'.
  refreshTokens.push(refreshToken); // Adiciona o novo token de atualização à lista de tokens de atualização válidos.
  return res.json({
    accessToken: accessToken, 
    refreshToken: refreshToken 
  }); // Envia os tokens gerados como resposta no formato JSON.
});

