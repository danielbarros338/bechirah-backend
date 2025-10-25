import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { IUserRepository } from '../../application/ports/UserRepository.port';
import { User as DomainUser } from '../../domain/entities/User.entity';
import UserMapper from '../mapper/user.mapper';
import { User as OrmUser } from '../orm-entities/user.ormEntity';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectRepository(OrmUser)
    private readonly repository: Repository<OrmUser>,
    private readonly userMapper: UserMapper,
  ) {}

  async create(user: DomainUser, manager?: EntityManager): Promise<DomainUser> {
    try {
      if (manager) {
        const repository = manager.getRepository(OrmUser);
        const ormUser = this.userMapper.toOrm(user);
        const createdUser = await repository.save(ormUser);

        return this.userMapper.toDomain(createdUser);
      } else {
        const ormUser = this.userMapper.toOrm(user);
        const createdUser = await this.repository.save(ormUser);

        return this.userMapper.toDomain(createdUser);
      }
    } catch (error: any) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);

      throw new Error('Failed to create user');
    }
  }

  async update(user: DomainUser, manager?: EntityManager): Promise<DomainUser> {
    try {
      if (manager) {
        const repository = manager.getRepository(OrmUser);
        const ormUser = this.userMapper.toOrm(user);
        const updatedUser = await repository.save(ormUser);

        return this.userMapper.toDomain(updatedUser);
      } else {
        const ormUser = this.userMapper.toOrm(user);
        const updatedUser = await this.repository.save(ormUser);

        return this.userMapper.toDomain(updatedUser);
      }
    } catch (error: any) {
      this.logger.error(`Error updating user: ${error.message}`, error.stack);

      throw new Error('Failed to update user');
    }
  }

  async delete(id: number, manager?: EntityManager): Promise<void> {
    try {
      if (manager) {
        const repository = manager.getRepository(OrmUser);
        const user = await repository.findOneBy({ id });

        if (user) {
          await repository.remove(user);
        }
      } else {
        const user = await this.repository.findOneBy({ id });

        if (user) {
          await this.repository.remove(user);
        }
      }
    } catch (error: any) {
      this.logger.error(`Error deleting user: ${error.message}`, error.stack);

      throw new Error('Failed to delete user');
    }
  }

  async softDelete(id: number, manager?: EntityManager): Promise<void> {
    try {
      if (manager) {
        const repository = manager.getRepository(OrmUser);
        await repository.softDelete(id);
      } else {
        await this.repository.softDelete(id);
      }
    } catch (error: any) {
      this.logger.error(
        `Error soft deleting user: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to soft delete user');
    }
  }

  async findById(id: number): Promise<DomainUser | null> {
    try {
      const ormUser = await this.repository.findOneBy({ id });

      if (!ormUser) {
        return null;
      }

      return this.userMapper.toDomain(ormUser);
    } catch (error: any) {
      this.logger.error(
        `Error finding user by ID: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to find user by ID');
    }
  }

  async findByEmail(email: string): Promise<DomainUser | null> {
    try {
      const ormUser = await this.repository.findOneBy({ email });

      if (!ormUser) {
        return null;
      }

      return this.userMapper.toDomain(ormUser);
    } catch (error: any) {
      this.logger.error(
        `Error finding user by email: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to find user by email');
    }
  }

  async findAll(): Promise<DomainUser[]> {
    try {
      const ormUsers = await this.repository.find();

      return ormUsers.map((ormUser) => this.userMapper.toDomain(ormUser));
    } catch (error: any) {
      this.logger.error(
        `Error finding all users: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to find all users');
    }
  }
}
