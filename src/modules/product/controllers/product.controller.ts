import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common'
import { ResponseMessage } from 'src/common/decorator/response.decorator'
import { Roles } from 'src/common/decorator/roles.decorator'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth/jwt-auth.guard'
import { UserRole } from 'src/modules/user/entities/user.entity'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'
import { GET_PRODUCT, GET_PRODUCTS, PRODUCT_DELETED, PRODUCT_UPDATED } from '../product.constants'
import { ProductService } from '../services/product.service'

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        return await this.productService.create(createProductDto)
    }

    @Get()
    @ResponseMessage(GET_PRODUCTS)
    findAll() {
        return this.productService.findAll()
    }

    @Get(':id')
    @ResponseMessage(GET_PRODUCT)
    findOne(@Param('id') id: number) {
        return this.productService.findOne(id)
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    @ResponseMessage(PRODUCT_UPDATED)
    update(
        @Param('id') id: number,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return this.productService.update(id, updateProductDto)
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ResponseMessage(PRODUCT_DELETED)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return  this.productService.remove(id)
    }
}
