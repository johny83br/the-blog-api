import { Body, ConflictException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HashingService } from 'src/common/hashing/hashing.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashingService,
  ) {}

  async create(@Body() dto: CreateUserDto) {
    const exists = await this.userRepository.exists({
      where: { email: dto.email },
    });

    if (exists) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    const hashedPassword = await this.hashService.hash(dto.password);

    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    const createdUser = await this.userRepository.save(user);

    return createdUser;
  }

  get(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  getAll() {
    return this.userRepository.find();
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  update(id: string, data: Partial<User>) {
    return this.userRepository.update(id, data);
  }
}
