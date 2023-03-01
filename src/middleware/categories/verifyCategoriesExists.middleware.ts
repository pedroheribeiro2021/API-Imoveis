import { NextFunction, Request, Response } from "express"
import AppDataSource from "../../data-source"
import { Categories } from "../../entities/categories.entity"
import { AppError } from "../../errors/AppError"


export const verifyCategoriesExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const categoryRegistred = AppDataSource.getRepository(Categories)

    const category = await categoryRegistred.findBy({
        name: req.body.name
    })
    
    if(category.length > 0) {
        
        throw new AppError('Category already exists', 409)
    }
    
    next()
}