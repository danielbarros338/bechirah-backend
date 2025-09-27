import { CryptUtils } from '../../../../shared/crypt';

export class Password {
  constructor(private readonly hashedValue: string) {}

  static fromHashed(hashed: string): Password {
    if (!hashed || hashed.length < 20) {
      throw new Error('Invalid hashed password'); // TODO: Custom error
    }

    return new Password(hashed);
  }

  static fromPlain(plain: string, crypt: CryptUtils): Password {
    if (!plain || plain.length < 8) {
      throw new Error('Password must be at least 8 characters long'); // TODO: Custom error
    }

    const hashed = crypt.encryptPBKDF2(plain);
    return new Password(hashed);
  }

  matches(plain: string, crypt: CryptUtils): boolean {
    return crypt.verifyPBKDF2(plain, this.hashedValue);
  }

  get value(): string {
    return this.hashedValue;
  }
}
