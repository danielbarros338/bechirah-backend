import { Body, Controller, HttpStatus, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponse } from '../../../../shared/dtos/appResponse.dto';
import { CreateUserDTO } from '../../application/dtos/createUser.dto';
import { CreateUserUseCase } from '../../application/use-cases/createUser.useCase';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

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
}
