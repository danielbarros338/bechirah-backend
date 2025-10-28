import { Roles } from '../../../../shared/enums/Roles.enum';
import { CreatedAt } from '../../../../shared/valueObjects/createdAt.vo';
import { DeletedAt } from '../../../../shared/valueObjects/deletedAt.vo';
import { Id } from '../../../../shared/valueObjects/idUser.vo';
import { UpdatedAt } from '../../../../shared/valueObjects/updatedAt.vo';
import { UserProp } from '../props/user.prop';
import { Email } from '../value-objects/email.vo';
import { IsActive } from '../value-objects/isActive.vo';
import { Name } from '../value-objects/name.vo';
import { Password } from '../value-objects/password.vo';
import { Role } from '../value-objects/role.vo';
import { Username } from '../value-objects/username.vo';

export class User {
  constructor(
    private id: Id,
    private name: Name,
    private username: Username,
    private readonly email: Email,
    private password: Password,
    private isActive: IsActive,
    private role: Role,
    private createdAt: CreatedAt,
    private updatedAt: UpdatedAt,
    private deletedAt: DeletedAt,
  ) {}

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

  get roleValue(): Roles {
    return this.role.value;
  }

  get idValue(): number | null {
    return this.id.value;
  }

  get createdAtValue(): Date {
    return this.createdAt.value;
  }

  get updatedAtValue(): Date | null {
    return this.updatedAt.value;
  }

  get deletedAtValue(): Date | null {
    return this.deletedAt.value;
  }

  activate(): void {
    this.isActive = IsActive.create(true);
  }

  deactivate(): void {
    this.isActive = IsActive.create(false);
  }

  changeRole(newRole: Roles): void {
    this.role = Role.create(newRole);
  }

  changeName(newName: string): void {
    this.name = Name.create(newName);
  }

  changeUsername(newUsername: string): void {
    this.username = Username.create(newUsername);
  }

  changePassword(newPassword: string): void {
    this.password = Password.fromHashed(newPassword);
  }

  static create(data: UserProp): User {
    return new User(
      Id.create(data.id ?? null),
      Name.create(data.name),
      Username.create(data.username),
      Email.create(data.email),
      Password.fromHashed(data.password),
      IsActive.create(data.isActive),
      Role.create(data.role),
      CreatedAt.create(new Date()),
      UpdatedAt.create(null),
      DeletedAt.create(null),
    );
  }
}
