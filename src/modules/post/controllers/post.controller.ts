import {
  Body, Controller, Delete, Get, Param, Patch, Post
} from '@nestjs/common'
import { CreatePostDto } from '../dto/create-post.dto'
import { UpdatePostDto } from '../dto/update-post.dto'
import { PostService } from '../services/post.service'

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    create(@Body() createPostDto: CreatePostDto) {
        return 1
    }

    @Get()
    findAll() {
        return 2
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return 3
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return 4
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return 5
    }
}
