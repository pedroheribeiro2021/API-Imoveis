import { Subject } from "typeorm/persistence/Subject"
import AppDataSource from "../../data-source"
import { Properties } from "../../entities/properties.entity"
import { Schedules_user_properties } from "../../entities/schedules_user_properties.entity"
import { AppError } from "../../errors/AppError"
import { IScheduleRequest } from "../../interfaces/schedules"


export const createSchedulesService = async({date, hour, propertyId, userId}: IScheduleRequest): Promise<object>=> {

    const schedulesRepository = AppDataSource.getRepository(Schedules_user_properties)
    const propertiesRepository = AppDataSource.getRepository(Properties)

    const property = await propertiesRepository.findOneBy({
        id: propertyId
    })

    const scheduleRegistered = await schedulesRepository.findOneBy({
        date: date,
        hour: hour,
    })

    if(scheduleRegistered) {
        throw new AppError('Property schedule already exists', 409)
    }

    const schedule = schedulesRepository.create({
        date,
        hour,
        property: property,
        id: userId
    })

    if(!property) {
        throw new AppError('Property not found', 404)
    }

    if(hour < '8:00' && hour > '18:00') {
        throw new AppError('Invalid hour', 400)
    }

    const weekDay = new Date(date)

    if(weekDay.getDay() === 6 || weekDay.getDay() === 7) {
        throw new AppError('Invalid date', 400)
    }


    await schedulesRepository.save(
        schedule
    )
    console.log(userId);
    
    return schedule

}