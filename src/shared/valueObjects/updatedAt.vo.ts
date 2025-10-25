export class UpdatedAt {
  constructor(private readonly updatedAt: Date | null) {}

  get value(): Date | null {
    return this.updatedAt;
  }

  static create(date: Date | null): UpdatedAt {
    if (date !== null && (!(date instanceof Date) || isNaN(date.getTime()))) {
      throw new Error('Invalid date');
    }

    return new UpdatedAt(date);
  }
}
