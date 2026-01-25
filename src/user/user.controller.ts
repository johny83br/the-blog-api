import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.userService.get(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  update(@Req() req: AuthenticatedRequest, @Body() dto: UpdateUserDto) {
    return this.userService.update(req.user.id, dto);
  }
}
