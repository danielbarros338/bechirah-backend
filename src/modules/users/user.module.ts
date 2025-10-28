import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptUtils } from '../../shared/crypt';
import { CreateUserUseCase } from './application/use-cases/createUser.useCase';
import { DeleteUserUseCase } from './application/use-cases/DeleteUser.useCase';
import { GetAllUsersUseCase } from './application/use-cases/GetAllUsers.useCase';
import { GetOneUserUseCase } from './application/use-cases/GetOneUser.useCase';
import { GetUserUseCase } from './application/use-cases/getUser.useCase';
import { SoftDeleteUserUseCase } from './application/use-cases/SoftDeleteUser.useCase';
import { UpdateUserUseCase } from './application/use-cases/UpdateUser.useCase';
import { UserController } from './infra/http/user.controller';
import UserMapper from './infra/mapper/user.mapper';
import { User } from './infra/orm-entities/user.ormEntity';
import { UserRepository } from './infra/repository/User.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    UserMapper,
    CreateUserUseCase,
    GetUserUseCase,
    GetOneUserUseCase,
    GetAllUsersUseCase,
    UpdateUserUseCase,
    SoftDeleteUserUseCase,
    DeleteUserUseCase,
    CryptUtils,
  ],
  exports: [CreateUserUseCase],
})
export class UserModule {}
