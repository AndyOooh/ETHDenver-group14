import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Tokenized Ballot API')
    .setDescription('UI for interacting with NestJS API')
    .setVersion('1.0')
    .addTag('Group 14')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
}
bootstrap();
