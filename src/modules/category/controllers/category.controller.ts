import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards
} from '@nestjs/common'
import { ResponseMessage } from 'src/common/decorator/response.decorator'
import { Roles } from 'src/common/decorator/roles.decorator'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth/jwt-auth.guard'
import { UserRole } from 'src/modules/user/entities/user.entity'
import {
    CATEGORY_DELETED,
    CATEGORY_UPDATED,
    GET_CATEGORIES,
    GET_CATEGORY
} from '../category.constants'
import { CreateCategoryDto } from '../dto/create-category.dto'
import { UpdateCategoryDto } from '../dto/update-category.dto'
import { CategoryService } from '../services/category.service'

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto)
    }

    @Get()
    @ResponseMessage(GET_CATEGORIES)
    findAll() {
        return this.categoryService.findAll()
    }

    @Get(':id')
    @ResponseMessage(GET_CATEGORY)
    findOne(@Param('id') id: number) {
        return this.categoryService.findOne(id)
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    @ResponseMessage(CATEGORY_UPDATED)
    update(
        @Param('id') id: number,
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        return this.categoryService.update(id, updateCategoryDto)
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ResponseMessage(CATEGORY_DELETED)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.categoryService.remove(id)
    }
}
