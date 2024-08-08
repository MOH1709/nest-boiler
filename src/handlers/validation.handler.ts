import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ValidationPipe as NestValidationPipe } from '@nestjs/common';

@Injectable()
export class ValidationHandler implements PipeTransform {
  private readonly validationPipe: NestValidationPipe;

  constructor() {
    this.validationPipe = new NestValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    });
  }

  async transform(value: unknown, metadata: ArgumentMetadata) {
    return await this.validationPipe.transform(value, metadata);
  }
}
