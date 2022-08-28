import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SubCategory } from '../sub-category/sub-category.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    title:string

    @OneToMany(()=> SubCategory, (subCategory)=>subCategory.parentCategory)
    subCategories:[SubCategory]

}
