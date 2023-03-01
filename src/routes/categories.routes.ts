import { Router } from "express"
import { createCategoriesController,  
        listCategoriesByIdController,  
        listCategoriesController } from "../controllers/categories.controller"
import { verifyCategoriesExistsMiddleware } from "../middleware/categories/verifyCategoriesExists.middleware"
import { ensureAdmMiddleware } from "../middleware/ensureAdm.middleware"
import { ensureAuthMiddleware } from "../middleware/ensureAuth.middleware"


export const categoriesRoutes = Router()

categoriesRoutes.get('', listCategoriesController)
categoriesRoutes.get('/:id/properties', listCategoriesByIdController)
categoriesRoutes.post('', ensureAuthMiddleware, ensureAdmMiddleware, verifyCategoriesExistsMiddleware, createCategoriesController)