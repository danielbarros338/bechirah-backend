import { User } from '../../orm-entities/user.ormEntity';

export interface IUserRepository {
  create(user: any): Promise<User>;
  createWithTransaction(user: any): Promise<User>;
}
