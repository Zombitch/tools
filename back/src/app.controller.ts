import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './core/user/user.service';

@Controller()
export class AppController implements OnModuleInit{

  constructor(
    private readonly appService: AppService,
    private readonly usersService: UserService
  ) {

  }

  onModuleInit() {
    this.usersService.load();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
 