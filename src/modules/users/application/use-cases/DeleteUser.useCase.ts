import { Inject, Injectable } from '@nestjs/common';
import { DeleteUserDTO } from '../dtos/deleteUser.dto';
import type { IUserRepository } from '../ports/UserRepository.port';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async delete(data: DeleteUserDTO): Promise<void> {
    const existing = await this.userRepository.findById(data.id);

    if (!existing) {
      throw new Error('Usuário não encontrado');
    }

    await this.userRepository.delete(data.id);
  }
}
