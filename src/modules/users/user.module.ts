import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from './application/use-cases/createUser.useCase';
import { GetUserUseCase } from './application/use-cases/getUser.useCase';
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
  ],
  exports: [CreateUserUseCase],
})
export class UserModule {}
