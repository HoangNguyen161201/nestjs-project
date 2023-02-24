import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from '../../../modules/user/entities/user.entity'
import { UserService } from '../../../modules/user/services/user.service'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username)
        const comparePass = await bcrypt.compare(pass, user.password)
        if (user && comparePass) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(user: any) {
        const payload = user as User
        const tokens = await this.createToken(
            {
                id: payload.id,
                username: payload.username,
                role: payload.role,
            },
            true
        )
        return {
            ...tokens,
        }
    }

    async logout(user: any) {
        const { username } = user as User
        await this.userService.update({ username }, { refreshToken: null })
    }

    async refresh(refreshToken: string) {
        try {
            const payload: User = await this.jwtService.verify(refreshToken, {
                secret: process.env.SECRET_REFRESH,
            })

            const user = await this.userService.getUserByRefresh(
                refreshToken,
                payload.username
            )

            const token = await this.createToken({
                id: user.id,
                username: user.username,
                role: user.role,
            })

            return {
                ...token,
            }
        } catch {
            throw new UnauthorizedException()
        }
    }

    private async createToken(user: Partial<User>, refresh = false) {
        const accessToken = this.jwtService.sign(user)
        if (refresh) {
            const refreshToken = this.jwtService.sign(user, {
                expiresIn: this.configService.get('jwt.refreshToken.expiresIn'),
                secret: this.configService.get('jwt.refreshToken.secret'),
            })

            await this.userService.update(user, {
                refreshToken,
            })
            return {
                username: user.username,
                accessToken,
                refreshToken,
            }
        } else {
            return {
                username: user.username,
                accessToken,
            }
        }
    }
}
