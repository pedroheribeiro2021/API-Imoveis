import { NextFunction, Request, Response } from "express"
import AppDataSource from "../../data-source"
import { Properties } from "../../entities/properties.entity"
import { AppError } from "../../errors/AppError"


export const verifyPropertyIsValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const propertyRegistred = AppDataSource.getRepository(Properties)

    const property = await propertyRegistred.findBy({
        id: req.params.id
    })
    
    if(property.length <= 0) {
        
        throw new AppError('Property not found', 404)
    }
    
    next()
}