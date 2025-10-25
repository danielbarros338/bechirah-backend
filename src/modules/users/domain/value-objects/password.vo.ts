export class Password {
  private constructor(private readonly _value: string) {}

  static fromHashed(hashed: string): Password {
    if (!hashed || hashed.length < 20) throw new Error('Invalid password hash');

    return new Password(hashed);
  }

  get value(): string {
    return this._value;
  }
}
