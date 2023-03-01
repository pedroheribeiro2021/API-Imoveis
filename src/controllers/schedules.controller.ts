import { Request, Response } from "express"
import { createSchedulesService } from "../services/schedules/createSchedules.service"
import { listSchedulesByIdPropertyService } from "../services/schedules/listSchedulesByIdProperty.service"


export const createSchedulesController = async(req: Request, res: Response) => {
    const {date, hour, propertyId} = req.body
    const userId = req.user.id

    await createSchedulesService({date, hour, propertyId, userId})
    return res.status(201).json({message: 'Schedule created'})
}

export const listSchedulesByIdPropertyController = async(req: Request, res: Response) => {

    const id: string = req.params.id

    const schedules = await listSchedulesByIdPropertyService(id)
    return res.status(200).json(schedules)
}