import AppDataSource from "../../data-source"
import { Addresses } from "../../entities/addresses.entity"
import { Categories } from "../../entities/categories.entity"
import { Properties } from "../../entities/properties.entity"
import { AppError } from "../../errors/AppError"
import { IPropertyRequest } from "../../interfaces/properties"


export const createPropertiesService = async({value, size, address, categoryId}: IPropertyRequest): Promise<object>=> {

    const propertiesRepository = AppDataSource.getRepository(Properties)
    const addressRepository = AppDataSource.getRepository(Addresses)
    const categoryRepository = AppDataSource.getRepository(Categories)

    const category = await categoryRepository.findOneBy({
        id: categoryId
    })

    const addressregistered = await addressRepository.findOneBy({
        district: address.district,
        zipCode: address.zipCode,
        number: address.number,
        city: address.city,
        state: address.state
    })

    if(addressregistered) {
        throw new AppError('Address already exists', 409)
    }
    
    const newAddress = addressRepository.create(
    {
        district: address.district,
        zipCode: address.zipCode,
        number: address.number,
        city: address.city,
        state: address.state
    })

    if(address.state.length > 2) {
        throw new AppError('Invalid state', 400)
    }

    if(address.zipCode.length > 8) {
        throw new AppError('Invalid zip code', 400)
    }

    await addressRepository.save(newAddress)

    const newProperty = propertiesRepository.create({
        value, 
        size,
        address: newAddress,
        category: category
    })

    if(!category) {
        throw new AppError('Category not found', 404)
    }
    
    await propertiesRepository.save(newProperty)
    
    return newProperty

}