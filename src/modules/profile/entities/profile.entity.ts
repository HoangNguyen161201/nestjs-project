import { IsInt, Length, Max, Min } from 'class-validator'
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    @Length(4, 20)
    lastName: string

    @Column({
        nullable: true,
    })
    @IsInt()
    @Min(12)
    @Max(100)
    age: number

    @Column({
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    @Length(4, 20)
    fistName: string

    @Column({
        unique: true,
    })
    numberPhone: string

    @Column({
        nullable: true,
    })
    address: string

    @Column({
        nullable: true,
    })
    job: string

    @Column({
        nullable: true,
    })
    avatar: string

    @CreateDateColumn()
    createDate: Date

    @UpdateDateColumn()
    updateDate: Date
}
