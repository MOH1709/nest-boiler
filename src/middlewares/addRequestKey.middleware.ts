import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

@Injectable()
export class AddRequestKeyInterceptor implements NestInterceptor {
  constructor(
    private key: string,
    private value: unknown
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    request[this.key] = this.value;

    return next.handle();
  }
}
