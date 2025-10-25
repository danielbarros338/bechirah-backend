import { Roles } from '../../../../shared/enums/Roles.enum';

export class Role {
  constructor(private readonly role: Roles) {}

  get value(): Roles {
    return this.role;
  }

  static create(raw: Roles): Role {
    const trimmed = raw.trim();
    const validRoles = Object.values(Roles) as string[];

    const matched = validRoles.find(
      (r) => r.toLowerCase() === trimmed.toLowerCase(),
    );

    if (!matched) {
      const message = `Role must be one of the following: ${validRoles.join(', ')}`;
      throw new Error(message); // TODO: Custom error
    }

    return new Role(matched as Roles);
  }
}
