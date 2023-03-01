import { Router } from "express"
import { createSchedulesController, 
        listSchedulesByIdPropertyController 
    } from "../controllers/schedules.controller"
import { ensureAdmMiddleware } from "../middleware/ensureAdm.middleware"
import { ensureAuthMiddleware } from "../middleware/ensureAuth.middleware"
import { verifyPropertyIsValidMiddleware } from "../middleware/schedules/verifyPropertyIsValid.middleware"


export const schedulesRoutes = Router()

schedulesRoutes.get('/properties/:id', ensureAuthMiddleware, ensureAdmMiddleware, verifyPropertyIsValidMiddleware, listSchedulesByIdPropertyController)
schedulesRoutes.post('', ensureAuthMiddleware, createSchedulesController)