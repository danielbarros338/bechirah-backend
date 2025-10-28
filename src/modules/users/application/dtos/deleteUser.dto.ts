import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class DeleteUserDTO {
  @ApiProperty({ example: 1, description: 'Id do usuário a ser excluído' })
  @IsInt({ message: 'O id deve ser um número inteiro' })
  @IsPositive({ message: 'O id deve ser um número positivo' })
  @IsNotEmpty({ message: 'O id é obrigatório' })
  id: number;
}
