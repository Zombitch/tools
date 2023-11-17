import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { SystemService } from '../system/system.service';
import { SecurityService } from '../security/security.service';
import { AppConfig } from '../../constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: AppConfig.jwtSecret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SystemService,
    SecurityService,
    {provide: APP_GUARD, useClass: AuthGuard}
  ],
  exports: [AuthService]
})

export class AuthModule {}
