import { ValidationPipe } from '@nestjs/common';

export const validationHandler = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
});
