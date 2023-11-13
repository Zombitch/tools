import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityService } from './core/security/security.service';
import { UsersModule } from './core/users/users.module';
import { SystemService } from './core/system/system.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({ignoreEnvFile: true})],
  controllers: [AppController],
  providers: [
    AppService, 
    SecurityService,
    SystemService
  ],
})
export class AppModule {}
