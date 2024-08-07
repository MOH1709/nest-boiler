import { Logger } from '@nestjs/common';
import * as morgan from 'morgan';

export const requestLogHandler = morgan(
  ':method :url :status :response-time ms',
  {
    skip: (req, res) => res.statusCode < 400,
    stream: {
      write: (message: string) => {
        Logger.error(message.trim(), 'Morgan');
      },
    },
  }
);
