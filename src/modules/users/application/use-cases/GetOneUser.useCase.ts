import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/User.entity';
import { GetOneUserDTO } from '../dtos/getOneUser.dto';
import type { IUserRepository } from '../ports/UserRepository.port';

@Injectable()
export class GetOneUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async get(data: GetOneUserDTO): Promise<User> {
    const user = await this.userRepository.findById(data.id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }
}
