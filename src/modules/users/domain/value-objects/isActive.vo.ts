export class IsActive {
  constructor(private readonly isActive: boolean) {}

  get value(): boolean {
    return this.isActive;
  }

  static create(raw: boolean): IsActive {
    if (typeof raw !== 'boolean') {
      throw new Error('IsActive must be a boolean value'); // TODO: Custom error
    }

    return new IsActive(raw);
  }
}
