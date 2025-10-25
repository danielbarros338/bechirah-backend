export class DeletedAt {
  constructor(private readonly deletedAt: Date | null) {}

  get value(): Date | null {
    return this.deletedAt;
  }

  static create(date: Date | null): DeletedAt {
    if (date !== null && (!(date instanceof Date) || isNaN(date.getTime()))) {
      throw new Error('Invalid date');
    }

    return new DeletedAt(date);
  }
}
