import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { onDevEnvironment } from './helpers/environment.helper';
import { ValidationPipe } from '@nestjs/common';
import { ResponseHandler } from './handlers/response.handler';
import { ErrorHandler } from './handlers/error.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseHandler());
  app.useGlobalFilters(new ErrorHandler());

  function setupSwagger() {
    const config = new DocumentBuilder()
      .setTitle('Boiler Plate')
      .setDescription('API description')
      .setVersion('1.0')
      .addTag('demo')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/doc', app, document);
  }
  onDevEnvironment(setupSwagger);

  const PORT = process.env.PORT ?? '5000';
  await app.listen(PORT);
}

bootstrap()
  .then()
  .catch((e) => console.log(e));
