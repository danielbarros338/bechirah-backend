export class Id {
  private constructor(private readonly id: number | null) {}

  static create(id: number | null): Id {
    return new Id(id);
  }

  get value(): number | null {
    return this.id;
  }
}
