import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./categories.entity";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";


@Entity('schedules_user_properties')
export class Schedules_user_properties {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'date'})
    date: string

    @Column({type: 'time'})
    hour: string

    @ManyToOne(() => Properties, properties => properties.schedules)
    property: Properties

    @ManyToOne(() => User, user => user.schedules)
    user: User
}