import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/AppError"


export const verifyFieldsMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.body

    if(user.id !== undefined || user.isAdm !== undefined || user.isActive !== undefined) {
        
        throw new AppError('Invalid field', 401)
    }

    return next()
}