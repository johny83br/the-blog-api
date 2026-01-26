import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { createSlugFromText } from 'src/common/utils/create-slug-from-text';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(author: User, dto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create({
      slug: createSlugFromText(dto.title),
      title: dto.title,
      content: dto.content,
      excerpt: dto.excerpt,
      coverImageUrl: dto.coverImageUrl,
      author,
    });

    const created = await this.postRepository
      .save(post)
      .catch((error: unknown) => {
        if (error instanceof Error) {
          this.logger.error(
            `Erro ao criar post para o autor ID ${author.id}: ${error.message}`,
            error.stack,
          );
        }

        throw new BadRequestException('Error ao criar o post');
      });

    return created;
  }
}
