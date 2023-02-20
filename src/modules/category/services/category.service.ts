import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCategoryDto } from '../dto/create-category.dto'
import { UpdateCategoryDto } from '../dto/update-category.dto'
import { Category } from '../entities/category.entity'

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) {}
    async create(createCategoryDto: CreateCategoryDto) {
        try {
            return await this.categoryRepository.save({ ...createCategoryDto })
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    findAll() {
        return this.categoryRepository.find({})
    }

    async findOne(id: number) {
        const category = await this.categoryRepository.findOneBy({ id })
        if (!category)
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
        return category
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.categoryRepository.findOneBy({ id })
        if (!category)
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
        return await this.categoryRepository.update({ id }, updateCategoryDto)
    }

    async remove(id: number) {
        const category = await this.categoryRepository.findOneBy({ id })
        if (!category)
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
        await this.categoryRepository.delete({ id })
        return {
            message: 'Remove successfully',
            status: HttpStatus.OK,
        }
    }
}
