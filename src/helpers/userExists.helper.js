import connection from "../database.js"
import { Client } from "../models/Client.js"

const database = await connection()
const client = new Client(database)

export async function userExists(id){
    const user = await client.findById(id);
    return Boolean(user)
}