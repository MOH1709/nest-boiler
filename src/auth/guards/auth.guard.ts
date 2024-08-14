// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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
      throw new UnauthorizedException('Access token not found.');
    }

    const payload = this.jwtService.verify(TOKEN);
    request.user = payload;

    return false;
  }

  private extractJwtFromRequest(request: Request): string | null {
    if (!request.headers.authorization) {
      return null;
    }
    const parts = request.headers.authorization.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
      return null;
    }
    return parts[1];
  }
}
