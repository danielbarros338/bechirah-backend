export class Review {
  constructor(private readonly review: string) {}

  get value(): string {
    return this.review;
  }

  static create(raw: string): Review {
    const trimmed = raw.trim();

    if (trimmed.length < 10 || trimmed.length > 4000) {
      throw new Error('Review must be between 10 and 4000 characters long'); // TODO: Custom error
    }

    return new Review(trimmed);
  }
}
