export class IdUser {
  private constructor(private readonly id: number | null) {}

  static create(id: number | null): IdUser {
    return new IdUser(id);
  }

  get value(): number | null {
    return this.id;
  }
}
