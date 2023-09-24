import express from "express"
import { config } from "dotenv"
import { routerMain } from "./route.js"

config()
const app = express()
app.use(express.json())

// route
app.use(routerMain)

app.listen(3000, () => {
  console.log(`Http Server Running 🚀`)
})