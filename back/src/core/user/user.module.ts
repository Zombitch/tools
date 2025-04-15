import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SystemService } from '../system/system.service';
import 'dotenv/config';

@Module({
  providers: [
    UserService, 
    SystemService
  ],
  exports: [UserService]
})
export class UserModule {}
