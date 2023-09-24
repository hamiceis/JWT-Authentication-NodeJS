import jwt from "jsonwebtoken"; // Importa a biblioteca 'jsonwebtoken' para criar tokens JWT.

// Função para criar um Token de Acesso para o usuário com base no 'user' passado como argumento (Payload).
export function generateAccessToken(user) {
  // Retorna um token JWT assinado com o 'user' e configurado para expirar em 10 minutos
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
}