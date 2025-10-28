import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/User.entity';
import type { IUserRepository } from '../ports/UserRepository.port';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
