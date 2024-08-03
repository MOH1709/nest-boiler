import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

type Exception = Error | HttpException;
@Catch()
export class ErrorHandler implements ExceptionFilter {
  private readonly logger = new Logger(ErrorHandler.name);

  catch(exception: Exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let messages: string[] = ['Internal server error'];

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      type ExceptionResponse = {
        message: string | string[];
      };
      const exceptionResponse = exception.getResponse() as ExceptionResponse;
      messages = Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message
        : [exceptionResponse.message];
    } else {
      this.logger.error(exception);
    }

    response.status(status).json({
      errors: messages,
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
