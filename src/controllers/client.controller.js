import express from "express";
import connection from "../database.js"
import { Client } from "../models/Client.js"

const { Request, Response } = express
const database = await connection()
const client = new Client(database)



async function find(req = Request, res = Response) {
    const clients = await client.find();
    return res.json({ clients })
}
async function save(req = Request, res = Response) {
    await client.save(req.body)
    return res.json({ message: "Client created" })
}

async function remove(req = Request, res = Response) {
    const id = req.headers["x-client-id"]
    await client.delete(id)
    return res.json({ message: "Client deleted" })
}
async function update(req = Request, res = Response) {
    const id = req.headers["x-client-id"]
    await client.update(id, req.body)
    const clients = await client.find();
    return res.json({ message: "Client updated", clients })
}

export const clientControllers = {
    find, save, remove, update
}