import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreatePostDto,
  ): Promise<PostResponseDto> {
    const post = await this.postService.create(req.user, dto);
    return new PostResponseDto(post);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/:id')
  async findOneOwned(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PostResponseDto> {
    const post = await this.postService.findOneOwnedOrFail({ id }, req.user);
    return new PostResponseDto(post);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findAllOwned(
    @Req() req: AuthenticatedRequest,
  ): Promise<PostResponseDto[]> {
    const post = await this.postService.findAllOwnedOrFail(req.user);
    return post.map(p => new PostResponseDto(p));
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdatePostDto,
  ): Promise<PostResponseDto> {
    const post = await this.postService.update({ id }, dto, req.user);
    return new PostResponseDto(post);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me/:id')
  async deleteOneOwned(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PostResponseDto> {
    const post = await this.postService.removeOwned({ id }, req.user);
    return new PostResponseDto(post);
  }

  @Get()
  async findAll(): Promise<PostResponseDto[]> {
    const post = await this.postService.findAllOrFail({ published: true });
    return post.map(p => new PostResponseDto(p));
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<PostResponseDto> {
    const post = await this.postService.findOneOrFail({
      slug,
      published: true,
    });
    return new PostResponseDto(post);
  }
}
