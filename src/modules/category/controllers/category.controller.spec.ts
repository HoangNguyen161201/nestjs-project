import { Test, TestingModule } from '@nestjs/testing'
import { CategoryController } from './category.controller'
import { CategoryService } from '../services/category.service'

describe('CategoryController', () => {
    let controller: CategoryController
    let service: CategoryService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoryController],
            providers: [CategoryService],
        }).compile()

        service = module.get<CategoryService>(CategoryService)
        controller = module.get<CategoryController>(CategoryController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
