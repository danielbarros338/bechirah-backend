import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class CryptUtils {
  private iterations: number;
  private keyLength: number;
  private digest: string;

  constructor(private readonly configService: ConfigService) {
    this.keyLength = parseInt(
      this.configService.get<string>('KEY_LENGTH') as string,
    );
    this.digest = this.configService.get<string>('ALG_DIGEST') as string;
    this.iterations = this.configService.get<number>('ITERATIONS') as number;
  }

  generateRandomPassword(length: number = 12): string {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
  }

  encryptPBKDF2(text: string): string {
    const salt = crypto.randomBytes(32).toString('base64');

    const derivedKey = crypto.pbkdf2Sync(
      text,
      salt,
      this.iterations,
      this.keyLength,
      this.digest,
    );

    return `${salt}:${this.iterations}:${derivedKey.toString('base64')}:${this.digest}:${this.keyLength}`;
  }

  verifyPBKDF2(text: string, hash: string): boolean {
    const [salt, iterations, key, digest, keyLength] = hash.split(':');
    const derivedKey = crypto.pbkdf2Sync(
      text,
      salt,
      parseInt(iterations),
      parseInt(keyLength),
      digest,
    );

    return crypto.timingSafeEqual(Buffer.from(key, 'base64'), derivedKey);
  }
}
