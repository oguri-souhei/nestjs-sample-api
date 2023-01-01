import { Body, Controller, Param, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userDto: UserDto): Promise<User> {
    return this.authService.signUp(userDto);
  }
}
