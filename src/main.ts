import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //힘스 이름은 상관없다
  const app = await NestFactory.create(AppModule); //얘를 따라가보면..

  app.useGlobalPipes(
    // 미들웨어랑 똑같다!
    new ValidationPipe({
      // 밸리데이션 미들웨어!
      whitelist: true, // 데코레이터 안붙어있는거는 pipe를 타지도 않는다.
      forbidNonWhitelisted: true, // pipe를 안탄게 있으면 에러발생. 이상한 프로퍼티 보내면 에러뜸
      transform: true, // 아무렇게나 온 타입을 바꿔줌 ! (ex. string -> number) 미친거 아냐?
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Swagger Example')
    .setDescription('Swagger study API description')
    .setVersion('1.0.0')
    .addTag('swagger')
    .build();

  // config를 바탕으로 swagger document 생성
  const document = SwaggerModule.createDocument(app, config);
  // Swagger UI에 대한 path를 연결함
  // .setup('swagger ui endpoint', app, swagger_document)
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
