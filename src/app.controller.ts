import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Controller 와 Service (Business Logic) 을 분리하려고! Controller는 url을 get 하고 function을 리턴하는 역할 뿐!
export class AppController {
  constructor(private readonly appService: AppService) {} //얘를 따라가보자.

  @Get() // same with get router in Express.
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello') // same with get router in Express.
  sayHello(): string {
    return this.appService.sayHello();
  }
}
