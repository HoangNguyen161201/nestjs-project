import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common'
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator'
import { Roles } from 'src/common/decorator/roles.decorator'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth/jwt-auth.guard'
import { User, UserRole } from '../entities/user.entity'
import { UserService } from '../services/user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Roles(UserRole.CLIENT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('username') username: string) {
        return this.userService.findOne(username)
    }
}
