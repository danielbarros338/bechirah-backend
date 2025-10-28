export class EmailTitle {
  constructor(private readonly emailTitle: string) {}

  get value(): string {
    return this.emailTitle;
  }

  static create(raw: string): EmailTitle {
    const trimmed = raw.trim();
    if (trimmed.length < 2 || trimmed.length > 255) {
      throw new Error('EmailTitle must be between 2 and 255 characters long'); // TODO: Custom error
    }

    return new EmailTitle(trimmed);
  }
}
