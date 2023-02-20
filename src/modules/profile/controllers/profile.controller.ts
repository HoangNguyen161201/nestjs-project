import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
    Put,
    ParseIntPipe,
} from '@nestjs/common'
import { ProfileService } from '../services/profile.service'
import { CreateProfileDto } from '../dto/create-profile.dto'
import { UpdateProfileDto } from '../dto/update-profile.dto'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth/jwt-auth.guard'
import { Request } from 'express'
import { User } from 'src/modules/user/entities/user.entity'

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() createProfileDto: CreateProfileDto,
        @Req() req: Request
    ) {
        const user = req.user as User
        return await this.profileService.create(createProfileDto, user)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.profileService.findOne(id)
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProfileDto: UpdateProfileDto
    ) {
        return await this.profileService.update(id, updateProfileDto)
    }
}
