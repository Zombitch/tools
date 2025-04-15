import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AllowAnonymous } from '../auth/auth.guard';
import { MailService } from './mail.service';
import { htmlToText } from 'html-to-text';

@Controller('mail')
export class MailController {

    constructor(private readonly mailService: MailService) {}

    @AllowAnonymous()
    @HttpCode(HttpStatus.OK)
    @Post('send')
    async send(@Body() body: {from: string, to: string, subject: string, html: string}) {
        if(body?.from && body?.to && body?.subject && body?.html){
            const result = await this.mailService.sendMail(body.from, body.to, body.subject, htmlToText(body.html), body.html);
            return result;
        }else{
            throw new BadRequestException("Missing parameter");
        }
    }
}
