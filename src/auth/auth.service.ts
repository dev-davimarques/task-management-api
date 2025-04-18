import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    // this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
    //   'JWT_EXPIRATION_TIME',
    //   3600,
    // );

    // TRECHO COM AJUDA DA IA
    const expirationTime = this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
    if (expirationTime === undefined) {
      throw new Error('JWT_EXPIRATION_TIME is not configured');
    }
    this.jwtExpirationTimeInSeconds = +expirationTime;
  }

  signIn(username: string, password: string): AuthResponseDto {
    const foundUser = this.usersService.findByUserName(username);

    if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, username: foundUser.username };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
