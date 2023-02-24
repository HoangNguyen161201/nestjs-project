import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../../modules/user/entities/user.entity'
import { UserService } from '../../../modules/user/services/user.service'
import { CreateProfileDto } from '../dto/create-profile.dto'
import { UpdateProfileDto } from '../dto/update-profile.dto'
import { Profile } from '../entities/profile.entity'

@Injectable()
export class ProfileService {
    constructor(
        private userService: UserService,
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async create(createProfileDto: CreateProfileDto, user: User) {
        const userData = await this.userService.findOne(user.username)
        if (!userData)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        const profile = this.profileRepository.create(createProfileDto)
        userData.profile = profile
        return await this.userRepository.save(userData)
    }

    async findOne(id: number) {
        const profile = await this.profileRepository.findOneBy({ id })
        if (!profile)
            throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
        return profile
    }

    async update(id: number, updateProfileDto: UpdateProfileDto) {
        const profile = await this.profileRepository.findOneBy({ id })
        if (!profile)
            throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
        return await this.profileRepository.update({ id }, updateProfileDto)
    }
}
