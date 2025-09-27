export class Username {
  constructor(private readonly username: string) {}

  get value(): string {
    return this.username;
  }

  static create(raw: string): Username {
    const trimmed = raw.trim();
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;

    if (!usernameRegex.test(trimmed)) {
      throw new Error(
        'Username must be 3-30 characters long and can only contain letters, numbers, and underscores',
      ); //TODO: Custom error
    }

    return new Username(trimmed);
  }
}
