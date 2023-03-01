import { Request, Response } from "express"
import { createCategoriesService } from "../services/categories/createCategories.service"
import { listCategoriesService } from "../services/categories/listCategories.service"
import { listCategoriesByIdService } from "../services/categories/listCategoriesById.service"


export const createCategoriesController = async(req: Request, res: Response) => {

    const { name } = req.body
    const newCategories = await createCategoriesService(name)
    return res.status(201).json(newCategories)
}

export const listCategoriesController = async(req: Request, res: Response) => {

    const categories = await listCategoriesService()
    return res.status(200).json(categories)
}

export const listCategoriesByIdController = async(req: Request, res: Response) => {
    const id: string = req.params.id

    const categories = await listCategoriesByIdService(id)
    return res.status(200).json(categories)
}