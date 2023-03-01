import { 
    BeforeInsert, 
    BeforeUpdate, 
    Column, 
    CreateDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn,
    UpdateDateColumn } from "typeorm";
import { hashSync } from 'bcryptjs'
import { Exclude } from "class-transformer";
import { Schedules_user_properties } from "./schedules_user_properties.entity";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column()
    @Exclude()
    password: string

    @Column()
    isAdm: boolean

    @Column({default: true})
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Schedules_user_properties, schedules => schedules.user)
    schedules: Schedules_user_properties[]

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword(){
        this.password = hashSync(this.password, 10)
    }
}

