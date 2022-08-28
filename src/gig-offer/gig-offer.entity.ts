import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Gig } from '../gig/gig.entity';

@Entity()
export class GigOffer {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    description:string

    @Column()
    amount:number

    @Column()
    deliveryDays:number

    @ManyToOne(()=>Gig, (gig)=> gig.offers)
    gig:Gig

    // services??
}
