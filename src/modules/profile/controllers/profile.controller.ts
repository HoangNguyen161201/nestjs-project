import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards
} from '@nestjs/common'
import { Request } from 'express'
import { ResponseMessage } from '../../../common/decorator/response.decorator'
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt-auth/jwt-auth.guard'
import { User } from '../../../modules/user/entities/user.entity'
import { CreateProfileDto } from '../dto/create-profile.dto'
import { UpdateProfileDto } from '../dto/update-profile.dto'
import {
    GET_PROFILE,
    PROFILE_CREATED,
    PROFILE_UPDATED
} from '../profile.constants'
import { ProfileService } from '../services/profile.service'

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ResponseMessage(PROFILE_CREATED)
    create(@Body() createProfileDto: CreateProfileDto, @Req() req: Request) {
        const user = req.user as User
        return this.profileService.create(createProfileDto, user)
    }

    @UseGuards(JwtAuthGuard)
    @ResponseMessage(GET_PROFILE)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.profileService.findOne(id)
    }

    @Put(':id')
    @ResponseMessage(PROFILE_UPDATED)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProfileDto: UpdateProfileDto
    ) {
        return this.profileService.update(id, updateProfileDto)
    }
}
