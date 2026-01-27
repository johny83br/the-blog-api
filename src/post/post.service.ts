import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { createSlugFromText } from 'src/common/utils/create-slug-from-text';
import { UpdatePostDto } from './dto/update-post.dto';

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

  async findOneOrFail(postData: Partial<Post>) {
    const post = await this.findOne(postData);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    return post;
  }

  async findOne(postData: Partial<Post>): Promise<Post | null> {
    const post = await this.postRepository.findOne({
      where: postData,
      relations: ['author'],
    });
    return post;
  }

  async findOneOwnedOrFail(
    postData: Partial<Post>,
    author: User,
  ): Promise<Post> {
    const post = await this.findOneOwned(postData, author);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    return post;
  }

  async findOneOwned(postData: Partial<Post>, author: User) {
    const post = await this.postRepository.findOne({
      where: {
        ...postData,
        author: { id: author.id },
      },
      relations: ['author'],
    });
    return post;
  }

  async findAllOwnedOrFail(author: User): Promise<Post[]> {
    const post = await this.findAllOwned(author);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    return post;
  }

  async findAllOwned(author: User) {
    const post = await this.postRepository.find({
      where: {
        author: { id: author.id },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['author'],
    });
    return post;
  }

  async update(postData: Partial<Post>, dto: UpdatePostDto, author: User) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException(
        'Nenhum campo foi fornecido para atualização',
      );
    }

    const post = await this.findOneOwnedOrFail(postData, author);

    if (dto.title) {
      post.title = dto.title;
      post.slug = createSlugFromText(dto.title);
    }

    post.title = dto.title ?? post.title;
    post.content = dto.content ?? post.content;
    post.excerpt = dto.excerpt ?? post.excerpt;
    post.coverImageUrl = dto.coverImageUrl ?? post.coverImageUrl;
    post.published = dto.published ?? post.published;

    return this.postRepository.save(post);
  }

  async removeOwned(postData: Partial<Post>, author: User) {
    const post = await this.findOneOwnedOrFail(postData, author);
    await this.postRepository.delete({ id: postData.id });
    return post;
  }

  async findAllOrFail(postData: Partial<Post>): Promise<Post[]> {
    const post = await this.findAll(postData);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    return post;
  }

  async findAll(postData: Partial<Post>) {
    const post = await this.postRepository.find({
      where: postData,
      order: {
        createdAt: 'DESC',
      },
      relations: ['author'],
    });
    return post;
  }
}
