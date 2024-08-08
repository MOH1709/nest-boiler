import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

type Exception = Error | HttpException | PrismaClientKnownRequestError;
@Catch()
export class ErrorHandler implements ExceptionFilter {
  private readonly logger = new Logger(ErrorHandler.name);

  catch(exception: Exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let messages: string[] = ['An unexpected error occurred'];

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
      const error = this.handlePrismaError(exception as Error);
      status = error.getStatus();

      if (status !== HttpStatus.INTERNAL_SERVER_ERROR) {
        messages = [error.message];
      }

      this.logger.error(error, error.stack);
    }

    response.status(status).json({
      errors: messages,
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }

  private handlePrismaError(error: Error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Known Prisma error
      switch (error.code) {
        case 'P2002':
          // Unique constraint failed
          this.logger.error(`Unique constraint failed: ${error.message}`);
          return new BadRequestException(`Invalid Input`);
        case 'P2025':
          // Record to delete does not exist
          this.logger.error(`Record not found: ${error.message}`);
          return new BadRequestException(`Invalid Input`);

        default:
          this.logger.error(`Prisma error: ${error.message}`);
          return new InternalServerErrorException(
            `An unexpected error occurred`
          );
      }
    } else {
      // Unknown error
      this.logger.error(`Unknown Prisma error: ${error.message}`);
      return new InternalServerErrorException(`An unexpected error occurred`);
    }
  }
}
