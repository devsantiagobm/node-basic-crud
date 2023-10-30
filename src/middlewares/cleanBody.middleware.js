import express from "express"
const { Request } = express

export function cleanBody(model) {
    return (req = Request, _, next) => {
        const { body } = req
        const keys = Object.keys(body)

        for (const key of keys) {
            if (!(key in model)) delete body[key]
        }

        next();
    }
}