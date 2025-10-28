import { TypeHiring as TypeHiringEnum } from '../../../../shared/enums/TypeHiring.enum';

export class TypeHiring {
  constructor(private readonly type: TypeHiringEnum) {}

  get value(): TypeHiringEnum {
    return this.type;
  }

  static create(raw: string): TypeHiring {
    const trimmed = raw.trim();
    const validTypes = Object.values(TypeHiringEnum) as string[];

    const matched = validTypes.find(
      (t) => t.toLowerCase() === trimmed.toLowerCase(),
    );

    if (!matched) {
      const message = `TypeHiring must be one of the following: ${validTypes.join(', ')}`;
      throw new Error(message); // TODO: Custom error
    }

    return new TypeHiring(matched as TypeHiringEnum);
  }
}
