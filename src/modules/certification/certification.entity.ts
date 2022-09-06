import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Certification {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    from:string

    @Column()
    date:Date
}
