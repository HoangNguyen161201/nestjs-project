import { IsString, Max, Min } from 'class-validator'
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { Product } from '../../product/entities/product.entity'

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @Min(4)
    @Max(100)
    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
    })
    name: string

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string

    @OneToMany(() => Product, (product) => product.id)
    products: Product[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
