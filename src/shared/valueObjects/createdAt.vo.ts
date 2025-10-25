export class CreatedAt {
  constructor(private readonly createdAt: Date) {}

  get value(): Date {
    return this.createdAt;
  }

  static create(date: Date): CreatedAt {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    return new CreatedAt(date);
  }
}
