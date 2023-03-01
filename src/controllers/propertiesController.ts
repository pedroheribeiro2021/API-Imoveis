import { Request, Response } from "express"
import { createPropertiesService } from "../services/properties/createProperties.service"
import { listPropertiesService } from "../services/properties/listProperties.service"


export const createPropertiesController = async(req: Request, res: Response) => {
    const {value, size, address, categoryId} = req.body

    const newProperties = await createPropertiesService({value, size, address, categoryId})
    return res.status(201).json(newProperties)
}

export const listPropertiesController = async(req: Request, res: Response) => {

    const properties = await listPropertiesService()
    return res.status(200).json(properties)
}
