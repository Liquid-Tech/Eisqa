import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from '../role/role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    name:string

    @Column()
    description:string

    @Column()
    gender:string

    @Column()
    platform:string

    @Column()
    country:string

    @Column()
    joiningDate:Date

    @Column()
    status:string
    
    @OneToOne(()=> Role)
    @JoinColumn()
    role: Role
}
