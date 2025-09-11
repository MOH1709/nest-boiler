import { MailTemplate, PageTemplate } from './enum';

export interface EnvVariable {
  PORT: number;
  JWT_SECRET: string;
  NODE_ENV: string;

  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
  DATABASE_URL: string;

  REDIS_PORT: number;
  REDIS_HOST: string;

  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
}
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
