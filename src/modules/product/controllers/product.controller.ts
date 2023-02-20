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
import { Roles } from 'src/common/decorator/roles.decorator'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth/jwt-auth.guard'
import { UserRole } from 'src/modules/user/entities/user.entity'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'
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
    findAll() {
        return this.productService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.productService.findOne(id)
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return await this.productService.update(id, updateProductDto)
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async remove(@Param('id') id: number) {
        return await this.productService.remove(id)
    }
}
