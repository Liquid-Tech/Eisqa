import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Level {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    responseTime:number

    @Column()
    days:number

    @Column()
    ordersCompletion:number

    @Column()
    NoOfOrders:number

    @Column()
    deliveryTime:number

    @Column()
    sales:number

    @Column()
    rating:number

    


}
