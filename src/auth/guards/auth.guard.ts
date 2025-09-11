// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as cookie from 'cookie';
import type { Request } from 'express';

@Injectable()
export class JWTAuthGuard extends NestAuthGuard('jwt') implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const TOKEN = this.extractJwtFromRequest(request);

    if (!TOKEN) {
      throw new UnauthorizedException('Invalid Token');
    }

    const payload = this.jwtService.verify(TOKEN);
    request.user = payload;

    return true;
  }

  private extractJwtFromRequest(request: Request): string | null {
    const cookies = request.headers.cookie
      ? cookie.parse(request.headers.cookie)
      : {};

    let token = cookies['access_token'];
    if (token.startsWith('j:')) {
      const jsonString = token.slice(2);
      try {
        const parsed = JSON.parse(jsonString);
        token = parsed.access_token;
      } catch (err) {
        return null;
      }
    }

    return token;
  }
}
