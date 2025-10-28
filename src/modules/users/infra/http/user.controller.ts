import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponse } from '../../../../shared/dtos/appResponse.dto';
import { CreateUserDTO } from '../../application/dtos/createUser.dto';
import { DeleteUserDTO } from '../../application/dtos/deleteUser.dto';
import { GetOneUserDTO } from '../../application/dtos/getOneUser.dto';
import { UpdateUserDTO } from '../../application/dtos/updateUser.dto';
import { CreateUserUseCase } from '../../application/use-cases/createUser.useCase';
import { DeleteUserUseCase } from '../../application/use-cases/DeleteUser.useCase';
import { GetAllUsersUseCase } from '../../application/use-cases/GetAllUsers.useCase';
import { GetOneUserUseCase } from '../../application/use-cases/GetOneUser.useCase';
import { SoftDeleteUserUseCase } from '../../application/use-cases/SoftDeleteUser.useCase';
import { UpdateUserUseCase } from '../../application/use-cases/UpdateUser.useCase';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getOneUserUseCase: GetOneUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly softDeleteUserUseCase: SoftDeleteUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post('create')
  async createUser(@Body() data: CreateUserDTO): Promise<AppResponse> {
    try {
      const user = await this.createUserUseCase.create(data);

      return new AppResponse(
        user,
        'Usuário criado com sucesso',
        HttpStatus.CREATED,
      );
    } catch (error: any) {
      this.logger.error('Erro ao criar usuário', error.stack);

      throw error;
    }
  }

  @Get('get-one/:id')
  async getOneUser(@Param('id') id: string): Promise<AppResponse> {
    try {
      const idNumber = parseInt(id);

      if (isNaN(idNumber)) {
        throw new Error('O id do usuário deve ser um número válido');
      }

      const user = await this.getOneUserUseCase.get({
        id: idNumber,
      } as GetOneUserDTO);

      return new AppResponse(
        user,
        'Usuário recuperado com sucesso',
        HttpStatus.OK,
      );
    } catch (error: any) {
      this.logger.error('Erro ao recuperar usuário', error.stack);

      throw error;
    }
  }

  @Get('get-all')
  async getAllUsers(): Promise<AppResponse> {
    try {
      const users = await this.getAllUsersUseCase.getAll();

      return new AppResponse(
        users,
        'Usuários recuperados com sucesso',
        HttpStatus.OK,
      );
    } catch (error: any) {
      this.logger.error('Erro ao recuperar usuários', error.stack);

      throw error;
    }
  }

  @Patch('update')
  async updateUser(@Body() data: UpdateUserDTO): Promise<AppResponse> {
    try {
      const updated = await this.updateUserUseCase.update(data);

      return new AppResponse(
        updated,
        'Usuário atualizado com sucesso',
        HttpStatus.OK,
      );
    } catch (error: any) {
      this.logger.error('Erro ao atualizar usuário', error.stack);

      throw error;
    }
  }

  @Delete('soft-delete/:id')
  async softDeleteUser(@Param('id') id: string): Promise<AppResponse> {
    try {
      const idNumber = parseInt(id);

      if (isNaN(idNumber)) {
        throw new Error('O id do usuário deve ser um número válido');
      }

      await this.softDeleteUserUseCase.softDelete({
        id: idNumber,
      } as DeleteUserDTO);

      return new AppResponse(
        null,
        'Usuário desativado com sucesso',
        HttpStatus.OK,
      );
    } catch (error: any) {
      this.logger.error('Erro ao desativar usuário', error.stack);

      throw error;
    }
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string): Promise<AppResponse> {
    try {
      const idNumber = parseInt(id);

      if (isNaN(idNumber)) {
        throw new Error('O id do usuário deve ser um número válido');
      }

      await this.deleteUserUseCase.delete({ id: idNumber } as DeleteUserDTO);

      return new AppResponse(
        null,
        'Usuário excluído com sucesso',
        HttpStatus.OK,
      );
    } catch (error: any) {
      this.logger.error('Erro ao excluir usuário', error.stack);

      throw error;
    }
  }
}
