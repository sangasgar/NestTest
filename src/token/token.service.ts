import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly ConfigService: ConfigService,
  ) {}
  async generateJWTToken(user) {
    const payload = { user };
    return this.jwtService.sign(payload, {
      secret: this.ConfigService.get('secret_jwt'),
      expiresIn: this.ConfigService.get('expire_jwt'),
    });
  }
}
