import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { TypeHiring } from '../../../../shared/enums/TypeHiring.enum';

export class UpdateJobVacancyDTO {
  @ApiProperty({
    example: 1,
    description: 'Id da vaga de emprego',
  })
  @IsString({ message: 'O id da vaga deve ser uma string' })
  @IsNotEmpty({ message: 'O id da vaga é obrigatório' })
  id: number;

  @ApiPropertyOptional({
    example: 'Desenvolvedor Fullstack',
    description: 'Título da vaga de emprego',
  })
  @IsOptional()
  @IsString({ message: 'O título da vaga deve ser uma string' })
  @Length(3, 255, {
    message: 'O título da vaga deve ter entre 3 e 255 caracteres',
  })
  title?: string;

  @ApiPropertyOptional({
    example: 2,
    description: 'Tempo de experiência exigido para a vaga (em anos)',
  })
  @IsOptional()
  @IsInt({ message: 'O tempo de experiência deve ser um número inteiro' })
  experienceTime?: number;

  @ApiPropertyOptional({
    example: TypeHiring.CLT,
    description: 'Tipo de contratação (e.g., CLT, PJ, Freelancer)',
  })
  @IsOptional()
  @IsEnum(TypeHiring, {
    message: 'O tipo de contratação deve ser um valor válido',
  })
  type?: TypeHiring;

  @ApiPropertyOptional({
    example: 'Rio de Janeiro, RJ',
    description: 'Localização da vaga de emprego',
  })
  @IsOptional()
  @IsString({ message: 'A localização deve ser uma string' })
  @Length(3, 255, {
    message: 'A localização deve ter entre 3 e 255 caracteres',
  })
  location?: string;

  @ApiPropertyOptional({
    example: 4.0,
    description: 'Nota de corte mínima para a vaga',
  })
  @IsOptional()
  @IsNumber(
    {},
    { message: 'A nota de corte deve ser um número inteiro ou decimal' },
  )
  cutRanking?: number;

  @ApiPropertyOptional({
    example: 'CURRÍCULO DESENVOLVEDOR FULLSTACK',
    description: 'Título de email esperado receber para a vaga',
  })
  @IsOptional()
  @IsString({ message: 'O título do email deve ser uma string' })
  @Length(3, 255, {
    message: 'O título do email deve ter entre 3 e 255 caracteres',
  })
  emailTitle?: string;

  @ApiPropertyOptional({
    example:
      'Estamos procurando um desenvolvedor fullstack com experiência em Node.js e React.',
    description: 'Descrição detalhada da vaga de emprego',
  })
  @IsOptional()
  @IsString({ message: 'A descrição da vaga deve ser uma string' })
  description?: string;
}
