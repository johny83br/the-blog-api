import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { HashingService } from 'src/common/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const isPasswordValid = await this.hashService.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha inválida');
    }

    user.forceLogout = false;
    await this.userService.save(user);

    const jwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return {
      accessToken,
    };
  }
}
