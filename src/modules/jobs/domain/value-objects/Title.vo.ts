export class Title {
  constructor(private readonly title: string) {}

  get value(): string {
    return this.title;
  }

  static create(raw: string): Title {
    const trimmed = raw.trim();

    if (trimmed.length < 5 || trimmed.length > 255) {
      throw new Error('Title must be between 5 and 255 characters long'); // TODO: Custom error
    }

    return new Title(trimmed);
  }
}
