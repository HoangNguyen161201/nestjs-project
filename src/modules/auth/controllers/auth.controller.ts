import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { Req, UseGuards } from '@nestjs/common/decorators'
import { Request } from 'express'
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto'
import { User } from 'src/modules/user/entities/user.entity'
import { UserService } from 'src/modules/user/services/user.service'
import { ResponseAuth } from '../auth.interface'
import { RefreshAuthDto } from '../dto/refresh-auth.dto'
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard'
import { LocalAuthGuard } from '../guards/local-auth/local-auth.guard'
import { AuthService } from '../services/auth.service'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('register')
    async register(
        @Body() userRegister: CreateUserDto
    ): Promise<Partial<User>> {
        return await this.userService.register(userRegister)
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Req() req: Request) {
        await this.authService.logout(req.user)
        return {
            status: HttpStatus.OK,
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request): Promise<ResponseAuth> {
        return this.authService.login(req.user)
    }

    @Post('refresh')
    async refresh(@Body() body: RefreshAuthDto): Promise<ResponseAuth> {
        const data = await this.authService.refresh(body.refreshToken)
        return data
    }
}
