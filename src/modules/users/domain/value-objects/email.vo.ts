export class Email {
  constructor(private readonly email: string) {}

  get value(): string {
    return this.email;
  }

  static create(raw: string): Email {
    const normalized = raw.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalized)) {
      throw new Error('Invalid email format'); // TODO: Usar uma classe de erro personalizada
    }

    return new Email(normalized);
  }
}
