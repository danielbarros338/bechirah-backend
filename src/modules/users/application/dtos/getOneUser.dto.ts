import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class GetOneUserDTO {
  @ApiProperty({ example: 1, description: 'Id do usuário' })
  @IsInt({ message: 'O id deve ser um número inteiro' })
  @IsPositive({ message: 'O id deve ser um número positivo' })
  @IsNotEmpty({ message: 'O id é obrigatório' })
  id: number;
}
