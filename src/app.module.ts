import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// command line interface => command line에서 nest generate (=g) [name] 하면 뭔가 막 됨!! 짱이다

@Module({
  // 데코레이터가 있다~ 클래스의 함수를 추가해준다고 함.
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'test',
      entities: ['dist/**/*.entity.js'],
      synchronize: false, //개발단에선 true, 운영단에선 false
    }),
    //TypeOrmModule.forRootAsync({useFactory: ormConfig})
    MoviesModule,
  ],
  // Controller : takes a URL and execute a function. sth like a router in Express.
  controllers: [AppController], //얘를 따라가보자.
  providers: [AppService],
})

//얘는 empty class이지만, 데코레이터가 다해줌.
export class AppModule {} // 모듈은 어떤 기능을 하는 앱 하나라고 보면 됨. ex. user, video, photo Module
