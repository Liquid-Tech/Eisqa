import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from '../category/category.entity';
import { GigOffer } from '../gig-offer/gig-offer.entity';

@Entity()
export class Gig {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    description:string

    @Column()
    createdAt:Date

    @OneToMany(()=> Category, (category)=> category.gig)
    categories:[Category]

    @OneToMany(()=>GigOffer, (gigOffer)=>gigOffer.gig)
    offers:[GigOffer]

}
