import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // requestのどこにtokenがあるかを指定
      ignoreExpiration: false, // 有効期限を考慮
      secretOrKey: 'secret123',
    });
  }

  async validate(payload: { id: string; username: string }): Promise<User> {
    const { id, username } = payload;
    const user = this.userRepository.findOne({ id, username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
