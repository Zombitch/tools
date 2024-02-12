import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityService } from './core/security/security.service';
import { UsersModule } from './core/user/user.module';
import { SystemService } from './core/system/system.service';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './core/user/user.controller';
import { AuthModule } from './core/auth/auth.module';
import { OpenAIController } from './ai/openai.controller';
import { LostPhoneAIController } from './ai/lostphoneai.controller';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot({ignoreEnvFile: true})],
  controllers: [AppController, UserController, OpenAIController, LostPhoneAIController],
  providers: [
    AppService, 
    SecurityService,
    SystemService
  ],
})
export class AppModule {}
