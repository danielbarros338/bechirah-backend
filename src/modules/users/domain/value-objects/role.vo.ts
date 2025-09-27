export class Role {
  constructor(private readonly role: string) {}

  get value(): string {
    return this.role;
  }

  static create(raw: string): Role {
    const trimmed = raw.trim().toUpperCase();
    const validRoles = ['ADMIN', 'USER', 'MODERATOR']; // Example roles

    if (!validRoles.includes(trimmed)) {
      throw new Error(
        `Role must be one of the following: ${validRoles.join(', ')}`,
      ); // TODO: Custom error
    }

    return new Role(trimmed);
  }
}
