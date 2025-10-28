export class Ranking {
  constructor(private readonly ranking: number) {}

  get value(): number {
    return this.ranking;
  }

  static create(raw: number): Ranking {
    if (raw < 1 || raw > 5) {
      throw new Error('Ranking must be between 1 and 5'); // TODO: Custom error
    }

    return new Ranking(raw);
  }
}
