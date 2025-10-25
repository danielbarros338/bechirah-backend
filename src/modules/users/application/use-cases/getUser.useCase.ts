import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/User.entity';
import { ValidateUserDTO } from '../dtos/validateUser.dto';
import type { IUserRepository } from '../ports/UserRepository.port';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async validate(data: ValidateUserDTO): Promise<User | null> {
    if (data.id) {
      return this.userRepository.findById(data.id);
    }

    if (data.email) {
      return this.userRepository.findByEmail(data.email);
    }

    return null;
  }
}
