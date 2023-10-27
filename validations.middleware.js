import { userExists } from "../helpers/userExists.helper.js"

class Validations {
    validateNewClient(req, res, next) {
        const { cedula, nombre, apellidos, edad, sexo, direccion, telefono } = req.body
        if (!cedula || !nombre || !apellidos || !edad || !sexo || !direccion || !telefono) return res.status(400).json({ message: "All fields must be completed" })
        next()
    }



    async validateUpdateClient(req, res, next) {
        try {
            const { cedula, nombre, apellidos, edad, sexo, direccion, telefono } = req.body

            if (!cedula || !nombre || !apellidos || !edad || !sexo || !direccion || !telefono) return res.status(400).json({ message: "All fields must be completed" })
            const clientId = req.headers["x-client-id"]
            if (!clientId) throw new Error("Client id is obligatory")


            const user = await userExists(clientId)
            if (!user) throw new Error("id not found in database")
            next()
        } catch (error) {
            return res.status(400).json({ "message": error.message })
        }
    }


    async validateDeleteClient(req, res, next) {
        try {
            const clientId = req.headers["x-client-id"]
            if (!clientId) throw new Error("Client id is obligatory")

            const user = await userExists(clientId)
            if (!user) throw new Error("id not found in database")

            next()
        } catch (error) {
            return res.status(400).json({ "message": error.message })
        }
    }
}



export const validations = new Validations()
