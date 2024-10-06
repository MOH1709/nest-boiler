import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendTemplateMailParams } from './interface';
import Mail from 'nodemailer/lib/mailer';
import { join } from 'path';
import { promises as fs } from 'fs';
import * as ejs from 'ejs';
import { customMessage } from 'src/common/constant';
import { MailTemplate } from 'src/common/enum';

@Injectable()
export class NodeMailerService implements OnModuleInit {
  private transporter: nodemailer.Transporter;

  constructor() {}

  async onModuleInit() {
    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } catch (error) {
      Logger.error(error, customMessage.Mail.INFO);
    }
  }

  async sendMail(mailOptions: Mail.Options) {
    try {
      mailOptions.from = process.env.SMTP_USER;

      const info = await this.transporter.sendMail(mailOptions);
      Logger.log(info.response, customMessage.Mail.INFO);
    } catch (error) {
      Logger.error(error, customMessage.Mail.INFO);
    }
  }

  async sendTemplateMail<T extends MailTemplate>(
    mailOptions: SendTemplateMailParams<T>
  ) {
    try {
      const TEMPLATE_PATH = join(
        __dirname,
        '..',
        '..',
        'views',
        mailOptions.template
      );
      const TEMPLATE_CONTENT = await fs.readFile(TEMPLATE_PATH, 'utf-8');
      const HTML = ejs.render(TEMPLATE_CONTENT, mailOptions.context);

      mailOptions.html = HTML;

      const info = await this.transporter.sendMail(mailOptions);
      Logger.log(info.response, customMessage.Mail.INFO);
    } catch (error) {
      Logger.error(error, customMessage.Mail.INFO);
    }
  }
}
