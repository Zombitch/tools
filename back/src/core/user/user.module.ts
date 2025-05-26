import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SystemService } from '../system/system.service';
import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    UserService, 
    SystemService
  ],
  exports: [UserService]
})
export class UserModule {}
