import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(userDto: UserDto): Promise<User> {
    return await this.userRepository.createUser(userDto);
  }
}
