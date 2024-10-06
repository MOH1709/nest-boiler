import { MailTemplate, PageTemplate } from './enum';

export interface RedisCustomRequestKey {
  ttl: number;
}

export interface PageTemplateContext {
  [PageTemplate.INFO]: {
    name: string;
  };
}

export interface MailTemplateContext {
  [MailTemplate.WELCOME]: {
    data: {
      name: string;
    };
  };
}
