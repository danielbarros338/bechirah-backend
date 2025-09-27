import { CryptUtils } from '../../../../shared/crypt';
import { Email } from '../value-objects/email.vo';
import { IsActive } from '../value-objects/isActive.vo';
import { Name } from '../value-objects/name.vo';
import { Password } from '../value-objects/password.vo';
import { Role } from '../value-objects/role.vo';
import { Username } from '../value-objects/username.vo';

export class User {
  constructor(
    private name: Name,
    private username: Username,
    private readonly email: Email,
    private password: Password,
    private isActive: IsActive,
    private role: Role,
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

  get usernameValue(): string {
    return this.username.value;
  }

  get nameValue(): string {
    return this.name.value;
  }

  get isActiveValue(): boolean {
    return this.isActive.value;
  }

  get roleValue(): string {
    return this.role.value;
  }

  activate(): void {
    this.isActive = IsActive.create(true);
  }

  deactivate(): void {
    this.isActive = IsActive.create(false);
  }

  changeRole(newRole: string): void {
    this.role = Role.create(newRole);
  }

  static create(
    name: string,
    username: string,
    email: string,
    password: string,
    isActive: boolean,
    role: string,
  ): User {
    return new User(
      Name.create(name),
      Username.create(username),
      Email.create(email),
      Password.fromPlain(password, CryptUtils.prototype),
      IsActive.create(isActive),
      Role.create(role),
    );
  }
}
