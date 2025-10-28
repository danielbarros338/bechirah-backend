export class Description {
  constructor(private readonly description: string) {}

  get value(): string {
    return this.description;
  }

  static create(raw: string): Description {
    const trimmed = raw.trim();
    if (trimmed.length < 10 || trimmed.length > 5000) {
      throw new Error(
        'Description must be between 10 and 5000 characters long',
      ); // TODO: Custom error
    }

    return new Description(trimmed);
  }
}
