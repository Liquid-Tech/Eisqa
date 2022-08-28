import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from '../category/category.entity';

@Entity()
export class SubCategory {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @ManyToOne(()=>Category, (category)=>category.subCategories)
    parentCategory:Category
}
