import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../../modules/user/entities/user.entity'
import { UserModule } from '../../../modules/user/user.module'
import { Profile } from '../entities/profile.entity'
import { ProfileService } from '../services/profile.service'

describe('ProfileService', () => {
    let service: ProfileService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UserModule, TypeOrmModule.forFeature([Profile, User])],
            providers: [ProfileService],
        }).compile()

        service = module.get<ProfileService>(ProfileService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
