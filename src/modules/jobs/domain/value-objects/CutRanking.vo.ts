export class CutRanking {
  constructor(private readonly cutRanking: number) {}

  get value(): number {
    return this.cutRanking;
  }

  static create(raw: number): CutRanking {
    if (raw < 0 || raw > 5) {
      throw new Error('CutRanking must be between 0 and 5'); // TODO: Custom error
    }

    return new CutRanking(raw);
  }
}
