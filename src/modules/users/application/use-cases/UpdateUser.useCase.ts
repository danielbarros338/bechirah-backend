import { Inject, Injectable } from '@nestjs/common';
import { CryptUtils } from '../../../../shared/crypt';
import { User } from '../../domain/entities/User.entity';
import { UpdateUserDTO } from '../dtos/updateUser.dto';
import type { IUserRepository } from '../ports/UserRepository.port';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly cryptUtils: CryptUtils,
  ) {}

  async update(data: UpdateUserDTO): Promise<User> {
    const existing = await this.userRepository.findById(data.id);

    if (!existing) {
      throw new Error('Usuário não encontrado');
    }

    const passwordHashed = data.password
      ? this.cryptUtils.encryptPBKDF2(data.password)
      : existing.passwordHash;

    const user = User.create({
      id: data.id,
      name: data.name ?? existing.nameValue,
      username: data.username ?? existing.usernameValue,
      email: data.email ?? existing.emailValue,
      password: passwordHashed,
      isActive: data.isActive ?? existing.isActiveValue,
      role: data.role ?? existing.roleValue,
      createdAt: existing.createdAtValue,
      updatedAt: new Date(),
    });

    return await this.userRepository.update(user);
  }
}
