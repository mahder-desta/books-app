import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
console.log(process.env.POSTGRES_DB);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Book API')
    .setDescription('API documentation for  book application')
    .setVersion('1.0.0')
    .addTag('books')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(4000);
}
bootstrap();
