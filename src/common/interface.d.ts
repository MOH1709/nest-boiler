import { MailTemplate } from './enum';

export interface RedisCustomRequestKey {
  ttl: number;
}

export interface TemplateContext {
  [MailTemplate.WELCOME]: {
    data: {
      name: string;
    };
  };
}
