import AppDataSource from "../../data-source"
import { Properties } from "../../entities/properties.entity"

export const listSchedulesByIdPropertyService = async (propertyId: string): Promise<object> => {

    const propertyRepository = AppDataSource.getRepository(Properties)

    const property = await propertyRepository.createQueryBuilder('properties').
    leftJoinAndSelect('properties.schedules', 'schedules').
    leftJoinAndSelect('properties.address', 'address').
    leftJoinAndSelect('properties.category', 'categories').
    where('properties.id = :id', {id: propertyId}).
    leftJoinAndSelect('schedules.user', 'user').
    getOne()

    return property

}