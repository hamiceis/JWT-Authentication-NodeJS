import jwt from "jsonwebtoken"

export function authenticateToken(req, res, next) {
  // Vamos pegar do cabeçalho da requisição o "Authorization", que deve ser do tipo "Bearer Token"
  const authHeader = req.headers['authorization']

  // Agora vamos pegar essa string e dividi-la em um array separado pelo espaço, onde a primeira posição é o tipo e a segunda posição é o nosso token
  // Exemplo: authHeader = "Bearer eykjfgjdfljgjkldflgjndfl"
  const token = authHeader && authHeader.split(' ')[1]
  // Verificando se o token não é undefined
  if (!token) {
    return res.status(401).send("Token não enviado")
  }

  // Verificando se o token está válido com jwt, passando como primeiro argumento o token, e o segundo argumento é a chave secreta (secretKey), e o terceiro argumento em uma callback(error, user: payload) 
  /*
   Se a verificação for bem-sucedida, este parâmetro conterá o objeto decodificado do payload do token. Esse objeto pode incluir as informações que foram originalmente codificadas no token, como informações de usuário ou qualquer outra coisa que você tenha incluído.
  */

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Token não é mais válido")
    }
    req.user = user
    next()
  })
}
