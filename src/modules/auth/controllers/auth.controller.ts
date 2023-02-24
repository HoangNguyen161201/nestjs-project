import { InjectQueue } from '@nestjs/bull'
import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { Req, UseGuards } from '@nestjs/common/decorators'
import { Queue } from 'bull'
import { Request } from 'express'
import { ResponseMessage } from '../../../common/decorator/response.decorator'
import { CreateUserDto } from '../../../modules/user/dto/create-user.dto'
import { User } from '../../../modules/user/entities/user.entity'
import { UserService } from '../../../modules/user/services/user.service'
import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REFRESH,
    AUTH_REGISTER
} from '../auth.constants'
import { ResponseAuth } from '../auth.interface'
import { RefreshAuthDto } from '../dto/refresh-auth.dto'
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard'
import { LocalAuthGuard } from '../guards/local-auth/local-auth.guard'
import { AuthService } from '../services/auth.service'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        @InjectQueue('send-mail') private mailQueue: Queue
    ) {}

    @ResponseMessage(AUTH_REGISTER)
    @Post('register')
    async register(
        @Body() userRegister: CreateUserDto
    ): Promise<Partial<User>> {
        const user = await this.userService.register(userRegister)
        await this.mailQueue.add(
            'register',
            {
                recipient: userRegister.username,
                subject: 'Register',
                content: 'Register successfully',
            },
            {
                removeOnComplete: true,
            }
        )
        return user
    }

    @UseGuards(JwtAuthGuard)
    @ResponseMessage(AUTH_LOGOUT)
    @Post('logout')
    async logout(@Req() req: Request) {
        await this.authService.logout(req.user)
        return {
            status: HttpStatus.OK,
        }
    }

    @UseGuards(LocalAuthGuard)
    @ResponseMessage(AUTH_LOGIN)
    @Post('login')
    login(@Req() req: Request): Promise<ResponseAuth> {
        return this.authService.login(req.user)
    }

    @Post('refresh')
    @ResponseMessage(AUTH_REFRESH)
    async refresh(@Body() body: RefreshAuthDto): Promise<ResponseAuth> {
        const data = await this.authService.refresh(body.refreshToken)
        return data
    }
}
