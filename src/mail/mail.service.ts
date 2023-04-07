import { Injectable, UseFilters } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOrderConfirmation(email_data: any) {
    await this.mailerService.sendMail({
      to: email_data.to,
      subject: 'Welcome view your Order Details',
      template: './OrderConfimation',
      context: email_data,
    });
  }
}