import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { json } from 'stream/consumers';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new ConsoleLogger({
      colors:true,
      json:true
    })
  });
    const config = new DocumentBuilder()
    .setTitle('Notes Api documentation')
    .setDescription('This is the documentation for notes API')
    .setVersion('1.0')
    .addTag('Notes')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalPipes( new  ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
