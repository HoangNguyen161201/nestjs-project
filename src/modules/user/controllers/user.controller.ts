import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common'
import { Roles } from '../../../common/decorator/roles.decorator'
import { RolesGuard } from '../../../common/guards/roles.guard'
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt-auth/jwt-auth.guard'
import { UserRole } from '../entities/user.entity'
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
