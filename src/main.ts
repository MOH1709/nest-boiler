import * as morgan from 'morgan';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { onDevEnvironment } from './helpers/environment.helper';
import { ValidationPipe } from '@nestjs/common';
import { ResponseHandler } from './handlers/response.handler';
import { ErrorHandler } from './handlers/error.handler';
import { setupSwagger } from './main.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.use(
    morgan('combined', {
      skip(req, res) {
        return res.statusCode <= 400 || res.statusCode === 404;
      },
    })
  );

  app.useGlobalInterceptors(new ResponseHandler());
  app.useGlobalFilters(new ErrorHandler());

  onDevEnvironment(() => setupSwagger(app));

  const PORT = process.env.PORT ?? '5000';
  await app.listen(PORT);
}

bootstrap()
  .then()
  .catch((e) => console.log(e));
