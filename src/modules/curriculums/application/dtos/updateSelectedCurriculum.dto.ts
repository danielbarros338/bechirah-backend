import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateSelectedCurriculumDTO {
  @ApiPropertyOptional({ example: 1, description: 'Id do currículo' })
  @IsInt({ message: 'O id deve ser um número inteiro' })
  @IsNotEmpty({ message: 'O id é obrigatório' })
  id: number;

  @ApiPropertyOptional({
    example: 'João Silva',
    description: 'Nome do candidato',
  })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  @Length(1, 255, { message: 'O nome deve ter entre 1 e 255 caracteres' })
  name?: string;

  @ApiPropertyOptional({ example: 4.5, description: 'Ranking do candidato' })
  @IsOptional()
  @IsNumber({}, { message: 'O ranking deve ser um número' })
  ranking?: number;

  @ApiPropertyOptional({ example: 'Ótimo candidato', description: 'Review' })
  @IsOptional()
  @IsString({ message: 'A review deve ser uma string' })
  review?: string;

  @ApiPropertyOptional({ example: 2, description: 'Id da profissão' })
  @IsOptional()
  @IsInt({ message: 'O professionId deve ser um número inteiro' })
  professionId?: number;
}
