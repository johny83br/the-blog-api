import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CommonModule } from 'src/common/common.module';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonModule, Repository<User>],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
