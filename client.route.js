import express, { Router } from "express";
import connection from "../database.js"
import { Client } from "../models/Client.js"
import { validations } from "../middlewares/validations.middleware.js";


const router = Router()
const { Request, Response } = express

const database = await connection()
const client = new Client(database)

router.get("/", async function (req = Request, res = Response) {
    const clients = await client.find();
    return res.json({ clients })
})
router.post("/", validations.validateNewClient, async function (req = Request, res = Response) {
    await client.save(req.body)
    return res.json({ message: "Client created" })
})
router.delete("/", validations.validateDeleteClient, async function (req = Request, res = Response) {
    const id = req.headers["x-client-id"]
    await client.delete(id)
    return res.json({ message: "Client deleted" })
})
router.put("/", validations.validateUpdateClient, async function (req = Request, res = Response) {
    const id = req.headers["x-client-id"]
    await client.update(id, req.body)
    return res.json({ message: "Client updated" })
})





export default router