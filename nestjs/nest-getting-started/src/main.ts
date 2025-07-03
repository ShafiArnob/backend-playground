import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Tell the application to use validation pipes. Declared globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips out elements that is not defined in dtos.
    }),
  );
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
