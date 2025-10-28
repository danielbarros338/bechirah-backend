export class Location {
  constructor(private readonly location: string) {}

  get value(): string {
    return this.location;
  }

  static create(raw: string): Location {
    const trimmed = raw.trim();

    if (trimmed.length < 2 || trimmed.length > 255) {
      throw new Error('Location must be between 2 and 100 characters long'); // TODO: Custom error
    }

    return new Location(trimmed);
  }
}
