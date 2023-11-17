import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SystemService } from '../system/system.service';

@Module({
  providers: [
    UserService, 
    SystemService
  ],
  exports: [UserService]
})
export class UsersModule {}
