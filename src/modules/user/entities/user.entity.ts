import { Exclude } from 'class-transformer'
import { IsEmail, IsString } from 'class-validator'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { Profile } from '../../profile/entities/profile.entity'

export enum UserRole {
    ADMIN = 'admin',
    CLIENT = 'client',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
    })
    @IsString()
    @IsEmail()
    username: string

    @Column()
    @IsString()
    @Exclude()
    password: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.CLIENT,
    })
    role: UserRole

    @Column({
        nullable: true,
    })
    refreshToken: string

    @OneToOne(() => Profile, (profile) => profile.id, {
        cascade: true,
    })
    @JoinColumn()
    profile: Profile

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date
}
