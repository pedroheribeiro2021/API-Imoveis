import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Properties } from "./properties.entity";


@Entity('addresses')
export class Addresses {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    district: string

    @Column()
    zipCode: string

    @Column({nullable: true})
    number: string

    @Column()
    city: string

    @Column()
    state: string
}