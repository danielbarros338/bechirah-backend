import { CryptUtils } from '../../../../shared/crypt';
import { Email } from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';

export class User {
  constructor(
    private readonly email: Email,
    private password: Password,
  ) {}

  verifyPassword(plain: string, crypt: CryptUtils): boolean {
    return this.password.matches(plain, crypt);
  }

  get passwordHash(): string {
    return this.password.value;
  }

  get emailValue(): string {
    return this.email.value;
  }
}
