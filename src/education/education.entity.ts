import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Education {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    date:Date

    @Column()
    from:string
}
