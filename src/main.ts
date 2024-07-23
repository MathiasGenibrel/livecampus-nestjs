import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { NODE_ENV } from './app/globals/config-module-root-option';

let ValidationPipeConfig: ValidationPipeOptions = {
  whitelist: true,
  transform: true,
};

if (process.env.NODE_ENV !== NODE_ENV.DEVELOPMENT) {
  ValidationPipeConfig = {
    ...ValidationPipeConfig,
    dismissDefaultMessages: true,
  };
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(ValidationPipeConfig));

  await app.listen(3000);
}
bootstrap();
