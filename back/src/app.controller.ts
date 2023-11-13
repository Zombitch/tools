import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './core/users/users.service';

@Controller()
export class AppController implements OnModuleInit{

  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService
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
 