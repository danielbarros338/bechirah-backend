import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { TypeHiring } from '../../../../shared/enums/TypeHiring.enum';

export class CreateJobVacancyDTO {
  @ApiProperty({
    example: 'Desenvolvedor Fullstack',
    description: 'Título da vaga de emprego',
  })
  @IsString({ message: 'O título da vaga deve ser uma string' })
  @IsNotEmpty({ message: 'O título da vaga é obrigatório' })
  @Length(3, 255, {
    message: 'O título da vaga deve ter entre 3 e 255 caracteres',
  })
  title: string;

  @ApiProperty({
    example: 2,
    description: 'Tempo de experiência exigido para a vaga (em anos)',
  })
  @IsInt({ message: 'O tempo de experiência deve ser um número inteiro' })
  @IsNotEmpty({ message: 'O tempo de experiência é obrigatório' })
  experienceTime: number;

  @ApiProperty({
    example: TypeHiring.CLT,
    description: 'Tipo de contratação (e.g., CLT, PJ, Freelancer)',
  })
  @IsEnum(TypeHiring, {
    message: 'O tipo de contratação deve ser um valor válido',
  })
  @IsNotEmpty({ message: 'O tipo de contratação é obrigatório' })
  type: TypeHiring;

  @ApiProperty({
    example: 'Rio de Janeiro, RJ',
    description: 'Localização da vaga de emprego',
  })
  @IsString({ message: 'A localização deve ser uma string' })
  @IsNotEmpty({ message: 'A localização é obrigatória' })
  @Length(3, 255, {
    message: 'A localização deve ter entre 3 e 255 caracteres',
  })
  location: string;

  @ApiProperty({
    example: 4.0,
    description: 'Nota de corte mínima para a vaga',
  })
  @IsNumber(
    {},
    { message: 'A nota de corte deve ser um número inteiro ou decimal' },
  )
  @IsNotEmpty({ message: 'A nota de corte é obrigatória' })
  cutRanking: number;

  @ApiProperty({
    example: 'CURRÍCULO DESENVOLVEDOR FULLSTACK',
    description: 'Título de email esperado receber para a vaga',
  })
  @IsString({ message: 'O título do email deve ser uma string' })
  @IsNotEmpty({ message: 'O título do email é obrigatório' })
  @Length(3, 255, {
    message: 'O título do email deve ter entre 3 e 255 caracteres',
  })
  emailTitle: string;

  @ApiProperty({
    example:
      'Estamos procurando um desenvolvedor fullstack com experiência em Node.js e React.',
    description: 'Descrição detalhada da vaga de emprego',
  })
  @IsString({ message: 'A descrição da vaga deve ser uma string' })
  @IsNotEmpty({ message: 'A descrição da vaga é obrigatória' })
  description: string;
}
