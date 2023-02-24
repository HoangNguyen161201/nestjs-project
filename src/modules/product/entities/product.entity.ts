import { IsString, Max, Min } from 'class-validator'
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Category } from '../../category/entities/category.entity'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @Min(4)
    @Max(200)
    @Column({
        type: 'varchar',
        length: 200,
    })
    name: string

    @Column('float')
    price: number

    @Column({
        array: true,
        type: 'text',
        default: [],
        nullable: false,
    })
    urlImgs: string[]

    @Column('bigint')
    quantity: number

    @Column('text')
    description: string

    @ManyToOne(() => Category, (category) => category.id)
    category: Category

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
