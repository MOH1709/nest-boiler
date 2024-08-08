import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { setupSwagger } from './swagger';
import { onDevEnvironment } from './helpers/environment.helper';
import { ResponseHandler } from './handlers/response.handler';
import { ErrorHandler } from './handlers/error.handler';
import { ValidationHandler } from './handlers/validation.handler';
import { requestLogHandler } from './handlers/requestLog.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // API Handlers
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationHandler());
  app.useGlobalInterceptors(new ResponseHandler());
  app.useGlobalFilters(new ErrorHandler());

  // API Analytics
  app.use(requestLogHandler);
  onDevEnvironment(() => setupSwagger(app));

  const PORT = process.env.PORT ?? '5000';
  await app.listen(PORT);
}

bootstrap()
  .then()
  .catch((e) => Logger.log(e));
