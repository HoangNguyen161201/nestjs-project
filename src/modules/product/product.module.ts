import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryModule } from '../category/category.module'
import { ProductController } from './controllers/product.controller'
import { Product } from './entities/product.entity'
import { ProductService } from './services/product.service'

@Module({
    imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
