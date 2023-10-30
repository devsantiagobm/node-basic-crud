import { ObjectId } from "mongodb"

export class Client{
    constructor(database){
        this.collection = database.collection("clientes")
    }

    async find(){
        return await this.collection.find({}).toArray()
    }

    async save(client){
        await this.collection.insertOne(client)
    }
    
    async delete(id){
        await this.collection.deleteOne({_id: new ObjectId(id)})
    }
    
    async update(id, client){
        await this.collection.updateOne({_id: new ObjectId(id)}, {$set: client})
    }

    async findById(id){
        return await this.collection.findOne({_id: new ObjectId(id)})
    }
    
}

export const ClientModel = {
    "nombre": "nombre",
    "apellidos": "apellidos",
    "cedula": "cedula",
    "edad": "edad",
    "sexo": "sexo",
    "direccion": "direccion",
    "telefono": "telefono",
}