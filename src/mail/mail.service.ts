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

// constructor() {
//     this.transporter = nodemailer.createTransport({
//         host: mailConfig.host,
//         port: Number(mailConfig.port),
//         auth: {
//             user: mailConfig.username,
//             pass: mailConfig.password,
//         },
//     });

//     const viewEngine = handlebars.create({
//         partialsDir: [partialsPath],
//         extname: '.hbs',
//         defaultLayout: layoutPath,
//     });
//     const hbsOptions = {
//         viewEngine,
//         viewPath,
//         extName: '.hbs',
//     };

//     this.transporter.use('compile', hbs(hbsOptions));
// }

// private transporter: nodemailer.Transporter;
// const viewPath = path.join(__dirname, '../../../src/email/views/');
// const layoutPath = path.resolve(__dirname, '../../../src/email/layouts/main');
// const partialsPath = path.resolve(__dirname, '../../../src/email/partials');
// async sendMail(receipient: string,
//     subject: string,
//     template: string,
//     data: any) {
//     try {
//         const mailOptions = {
//             from: `${mailConfig.sender.name} <${mailConfig.sender.address}>`,
//             to: receipient,
//             subject: subject,
//             template: template,
//             context: data,
//         };

//         let send = await this.transporter.sendMail(mailOptions);
//         console.log(send, "______******************______________")
//     } catch (error) {
//         console.error('EMAIL_SEND', error.message);
//     }
// }
