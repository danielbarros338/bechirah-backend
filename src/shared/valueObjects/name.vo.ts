export class Name {
  constructor(private readonly name: string) {}

  get value(): string {
    return this.name;
  }

  static create(raw: string): Name {
    const trimmed = raw.trim();

    if (trimmed.length < 2 || trimmed.length > 100) {
      throw new Error('Name must be between 2 and 100 characters long'); // TODO: Custom error
    }

    return new Name(trimmed);
  }
}
