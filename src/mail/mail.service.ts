import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  send(to: string, subject: string, text: string) {
    return this.mailService.sendMail({
      text,
      to,
      subject,
      from: process.env.MAIL_EMAIL,
    });
  }
}
