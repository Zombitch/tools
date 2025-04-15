import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {

  constructor(private readonly mailerService: MailerService) {
  }

  async sendMail(from: string, to: string, subject: string, text: string = "", html: string = "") {
    const mailOptions = {
      from: from,
      replyTo: from,
      to: to,
      subject: subject,
      text: text,
      html: html
    };

    return this.mailerService.sendMail(mailOptions);
  }
}

