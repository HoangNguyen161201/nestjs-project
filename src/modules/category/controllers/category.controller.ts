import {
  Body, Controller, Delete, Get, Param, Post, Put, UseGuards
} from '@nestjs/common'
import { Roles } from 'src/common/decorator/roles.decorator'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth/jwt-auth.guard'
import { UserRole } from 'src/modules/user/entities/user.entity'
import { CreateCategoryDto } from '../dto/create-category.dto'
import { UpdateCategoryDto } from '../dto/update-category.dto'
import { CategoryService } from '../services/category.service'

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoryService.create(createCategoryDto)
    }

    @Get()
    findAll() {
        return this.categoryService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.categoryService.findOne(id)
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        return await this.categoryService.update(id, updateCategoryDto)
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async remove(@Param('id') id: number) {
        return await this.categoryService.remove(id)
    }
}
