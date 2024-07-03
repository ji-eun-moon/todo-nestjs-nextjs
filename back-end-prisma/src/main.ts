import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('JIEUN TODO APP API')
    .setDescription('JIEUN TODO APP API Documentation')
    .setVersion('1.0')
    .addCookieAuth()
    .addServer(process.env.HOST)
    .build();

  // config를 바탕으로 swagger document 생성
  const document = SwaggerModule.createDocument(app, config);

  // Swagger UI 경로 설정
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true }, // 인증 정보를 유지
  });

  await app.listen(4000);
}
bootstrap();
