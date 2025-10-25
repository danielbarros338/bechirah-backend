import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from '../../domain/entities/User.entity';
import { CreateUserDTO } from '../dtos/createUser.dto';
import type { IUserRepository } from '../ports/UserRepository.port';
import { GetUserUseCase } from './getUser.useCase';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly repository: IUserRepository,
    private readonly getUser: GetUserUseCase,
  ) {}

  async create(data: CreateUserDTO, manager?: EntityManager): Promise<User> {
    const user = User.create(data);

    const existingUser = await this.getUser.validate({ email: data.email });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const userCreated = this.repository.create(user, manager);

    return userCreated;
  }
}
