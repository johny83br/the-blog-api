import { Body, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  login(@Body() loginDto: LoginDto) {
    console.log(loginDto.email, loginDto.password);
    return loginDto;
  }
}
