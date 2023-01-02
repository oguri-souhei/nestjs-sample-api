import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { SignInDto } from './dto/signIn.dto';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userDto: UserDto): Promise<User> {
    return await this.userRepository.createUser(userDto);
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { username, password } = signInDto;
    const user = await this.userRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, username: user.username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('ユーザー名またはパスワードが異なります');
  }
}
