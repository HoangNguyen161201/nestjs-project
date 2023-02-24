import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
import { UserModule } from '../user/user.module'
import { ProfileController } from './controllers/profile.controller'
import { Profile } from './entities/profile.entity'
import { ProfileService } from './services/profile.service'

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([Profile, User])],
    controllers: [ProfileController],
    providers: [ProfileService],
})
export class ProfileModule {}
