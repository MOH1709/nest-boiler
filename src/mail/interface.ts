import Mail from 'nodemailer/lib/mailer';
import { MailTemplate } from 'src/common/enum';
import { MailTemplateContext } from 'src/common/interface';

export interface SendTemplateMailParams<T extends MailTemplate>
  extends Mail.Options {
  template: T;
  context: MailTemplateContext[T];
}
