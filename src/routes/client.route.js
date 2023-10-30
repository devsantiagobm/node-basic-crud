import { Router } from "express";
import { validations, cleanBody } from "../middlewares/index.js";
import { clientControllers } from "../controllers/client.controller.js";
import { ClientModel } from "../models/Client.js";

const router = Router()

router.get("/", clientControllers.find)
router.post("/", [validations.validateNewClient, cleanBody(ClientModel)], clientControllers.save)
router.put("/", [validations.validateUpdateClient, cleanBody(ClientModel)], clientControllers.update)
router.delete("/", validations.validateDeleteClient, clientControllers.remove)


export default router