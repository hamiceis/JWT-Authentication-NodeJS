import express from 'express'
import { authRouter } from './route.js'
import { config } from "dotenv"

config()
const app = express()
app.use(express.json())

app.use(authRouter)

app.listen(4000, () => {
  console.log("AuthServer Running PORT: 4000")
})