import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class GetOneJobVacancyDTO {
  @ApiProperty({ example: 1, description: 'Id da vaga de emprego' })
  @IsInt({ message: 'O id da vaga deve ser um número inteiro' })
  @IsPositive({ message: 'O id da vaga deve ser um número positivo' })
  @IsNotEmpty({ message: 'O id da vaga é obrigatório' })
  id: number;
}
