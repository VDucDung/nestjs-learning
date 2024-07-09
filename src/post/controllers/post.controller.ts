import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
// import { ExceptionLoggerFilter } from 'src/utils/exceptionLogger.filter';
import { HttpExceptionFilter } from 'src/utils/httpException.filter';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return this.postService.createPost(post);
  }

  @Get(':id')
  // @UseFilters(ExceptionLoggerFilter)
  @UseFilters(HttpExceptionFilter)
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Put(':id')
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postService.replacePost(id, post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    await this.postService.deletePost(id);
    return true;
  }
}
