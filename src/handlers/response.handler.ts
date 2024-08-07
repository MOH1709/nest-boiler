import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseHandler implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    return next.handle().pipe(
      map((data) => ({
        data,
        statusCode: context.switchToHttp().getResponse().statusCode,
        path: url,
        timestamp: new Date().toISOString(),
      }))
    );
  }
}
