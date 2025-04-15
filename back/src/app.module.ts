import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityService } from './core/security/security.service';
import { UserModule } from './core/user/user.module';
import { SystemService } from './core/system/system.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './core/user/user.controller';
import { AuthModule } from './core/auth/auth.module';
import { OpenAIController } from './ai/openai.controller';
import { LostPhoneAIController } from './ai/lostphoneai.controller';
import { MailController } from './core/mailing/mail.controller';
import { MailService } from './core/mailing/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: "smtp.gmail.com",
          secure: true,
          port: 465,
          auth: { user: process.env.smtpUser, pass: process.env.smtpPwd },
        },
      }),
    }),
    AuthModule, UserModule,
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
