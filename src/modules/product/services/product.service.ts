import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryService } from 'src/modules/category/services/category.service'

import { Repository } from 'typeorm'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'
import { Product } from '../entities/product.entity'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private categoryService: CategoryService
    ) {}

    async create(createProductDto: CreateProductDto) {
        const newProduct = this.productRepository.create(createProductDto)
        if (createProductDto.categoryId) {
            const category = await this.categoryService.findOne(
                createProductDto.categoryId
            )
            newProduct.category = category
        }
        return await this.productRepository.save(newProduct)
    }

    findAll() {
        return this.productRepository.find({})
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOneBy({ id })
        if (!product)
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
        return product
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        const product = await this.findOne(id)
        if (!product)
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

        let newProduct = { ...product, ...updateProductDto }
        if (updateProductDto.categoryId) {
            const category = await this.categoryService.findOne(
                updateProductDto.categoryId
            )
            newProduct.category = category
        }
        return await this.productRepository.save(newProduct)
    }

    async remove(id: number) {
        const product = await this.findOne(id)
        if (!product)
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
        await this.productRepository.delete({ id })
        return ''
    }
}
