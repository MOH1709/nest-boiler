import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  constructor() {}

  generateHash(payload: unknown): string {
    const stringPayload = JSON.stringify(payload);

    return crypto.createHash('sha256').update(stringPayload).digest('hex');
  }
}
