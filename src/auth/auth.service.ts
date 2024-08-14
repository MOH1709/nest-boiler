import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(user: GenerateTokenPayload) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getHashedString(str: string): Promise<string> {
    const SALT_ROUNDS = 10;
    return await bcrypt.hash(str, SALT_ROUNDS);
  }

  async compareHashedString(str: string, hashedStr: string): Promise<boolean> {
    return await bcrypt.compare(str, hashedStr);
  }
}
