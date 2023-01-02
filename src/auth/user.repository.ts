import { User } from '../entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userDto: UserDto): Promise<User> {
    const { username, password, status } = userDto;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = this.create({
      username,
      password: hashPassword,
      status,
    });
    await this.save(user);
    return user;
  }
}
