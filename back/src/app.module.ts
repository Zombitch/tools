import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from 'assets/constants';
import { SecurityService } from './core/security/security.service';
import { UsersModule } from './core/user/user.module';
import { SystemService } from './core/system/system.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './core/user/user.controller';
import { AuthModule } from './core/auth/auth.module';
import { OpenAIController } from './ai/openai.controller';
import { LostPhoneAIController } from './ai/lostphoneai.controller';
import { MailController } from './core/mailing/mail/mail.controller';
import { MailService } from './core/mailing/mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: "smtp.gmail.com",
          secure: true,
          port: 465,
          auth: { user: AppConfig.smtpUser, pass: AppConfig.smtpPwd },
        },
      }),
    }),
    AuthModule, UsersModule,
    ConfigModule.forRoot({ignoreEnvFile: true})
  ],
  controllers: [AppController, UserController, OpenAIController, LostPhoneAIController, MailController],
  providers: [
    AppService, 
    SecurityService,
    SystemService,
    MailService
  ],
})
export class AppModule {}
