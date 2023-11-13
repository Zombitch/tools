import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SystemService } from '../system/system.service';

@Module({
  providers: [
    UsersService, 
    SystemService
  ],
  exports: [UsersService]
})
export class UsersModule {}
