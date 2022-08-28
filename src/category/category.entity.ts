import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SubCategory } from '../sub-category/sub-category.entity';
import { Gig } from '../gig/gig.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    title:string

    @OneToMany(()=> SubCategory, (subCategory)=>subCategory.parentCategory)
    subCategories:[SubCategory]

    @ManyToOne(()=> Gig, (gig)=>gig.categories)
    gig:Gig

}
