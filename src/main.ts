import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  //힘스 이름은 상관없다
  const app = await NestFactory.create(AppModule); //얘를 따라가보면..
  await app.listen(3000);
}
bootstrap();
