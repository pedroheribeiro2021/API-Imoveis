import { Router } from "express"
import { createPropertiesController, listPropertiesController } from "../controllers/propertiesController"
import { ensureAdmMiddleware } from "../middleware/ensureAdm.middleware"
import { ensureAuthMiddleware } from "../middleware/ensureAuth.middleware"


export const propertiesRoutes = Router()

propertiesRoutes.get('', listPropertiesController)
propertiesRoutes.post('', ensureAuthMiddleware, ensureAdmMiddleware, createPropertiesController)
