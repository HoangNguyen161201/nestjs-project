import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../dto/create-user.dto'
import { User } from '../entities/user.entity'
import { UserUpdOptions } from '../user.interface'
import { UserUpdateFilter } from '../user.middleware'

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

    findOne(username: string) {
        return this.UserRepository.findOneBy({ username })
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
