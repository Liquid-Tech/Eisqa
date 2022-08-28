import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Badge {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string


}
