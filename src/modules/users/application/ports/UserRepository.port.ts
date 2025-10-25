import { EntityManager } from 'typeorm';
import { User } from '../../domain/entities/User.entity';

export interface IUserRepository {
  create(user: User, manager?: EntityManager): Promise<User>;
  update(user: User, manager?: EntityManager): Promise<User>;
  delete(id: number, manager?: EntityManager): Promise<void>;
  softDelete(id: number, manager?: EntityManager): Promise<void>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}
