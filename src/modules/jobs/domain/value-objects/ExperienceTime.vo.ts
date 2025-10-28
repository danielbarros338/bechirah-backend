export class ExperienceTime {
  constructor(private readonly experienceTime: number) {}

  get value(): number {
    return this.experienceTime;
  }

  static create(raw: number): ExperienceTime {
    const trimmed = raw;

    if (trimmed < 0) {
      const message = 'ExperienceTime must be a non-negative number';
      throw new Error(message); // TODO: Custom error
    }

    if (trimmed > 50) {
      const message = 'ExperienceTime seems unreasonably high';
      throw new Error(message); // TODO: Custom error
    }

    if (Number.isNaN(trimmed)) {
      const message = 'ExperienceTime must be a valid number';
      throw new Error(message); // TODO: Custom error
    }

    if (!Number.isInteger(trimmed)) {
      const message = 'ExperienceTime must be an integer';
      throw new Error(message); // TODO: Custom error
    }

    return new ExperienceTime(trimmed);
  }
}
