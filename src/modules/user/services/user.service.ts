import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../dto/create-user.dto'
import { User } from '../entities/user.entity'
import * as bcrypt from 'bcrypt'
import { UserUpdateFilter } from '../user.middleware'
import { UserUpdOptions } from '../user.interface'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private UserRepository: Repository<User>
    ) {}

    async register(userRegister: CreateUserDto) {
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(userRegister.password, salt)

        const { password, confirmPassword, ...user } =
            await this.UserRepository.save({
                ...userRegister,
                password: hashPassword,
            })

        return user
    }

    async findOne(username: string) {
        const user = await this.UserRepository.findOneBy({ username })
        return user
    }

    async update(filter: UserUpdateFilter, update: Partial<UserUpdOptions>) {
        if (update.refreshToken) {
            update.refreshToken = await bcrypt.hash(
                this.reverse(update.refreshToken),
                10
            )
        }
        return await this.UserRepository.update(filter, update)
    }

    async getUserByRefresh(refreshToken: string, username: string) {
        const user = await this.findOne(username)
        if (!user) {
            throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED)
        }

        const isEqual = await bcrypt.compare(
            this.reverse(refreshToken),
            user.refreshToken
        )

        if (!isEqual)
            throw new HttpException(
                'Invalid credentials',
                HttpStatus.UNAUTHORIZED
            )

        return user
    }

    private reverse(text: string) {
        return text.split('').reverse().join('')
    }
}
