import express from "express"
import clientRouter from "./src/routes/client.route.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}))

app.use("/clients", clientRouter)

app.listen(8000, () => console.log("Servidor corriendo..."))