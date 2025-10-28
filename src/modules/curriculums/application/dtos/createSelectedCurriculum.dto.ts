import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateSelectedCurriculumDTO {
  @ApiProperty({ example: 'Daniel Barros', description: 'Nome do candidato' })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @Length(1, 255, { message: 'O nome deve ter entre 1 e 255 caracteres' })
  name: string;

  @ApiProperty({ example: 4.75, description: 'Média das notas do currículo' })
  @IsNumber(
    {},
    { message: 'A classificação deve ser um número inteiro ou decimal' },
  )
  @IsNotEmpty({ message: 'A classificação não pode ser vazia' })
  ranking: number;

  @ApiProperty({
    example: 'O candidato possui experiência em desenvolvimento web e mobile.',
    description: 'Avaliação do currículo',
  })
  @IsString({ message: 'A avaliação deve ser uma string' })
  @IsNotEmpty({ message: 'A avaliação não pode ser vazia' })
  review: string;

  @ApiProperty({
    example: 1,
    description: 'Identificador da profissão associada ao currículo',
  })
  @IsNumber({}, { message: 'O ID da profissão deve ser um número inteiro' })
  @IsNotEmpty({ message: 'O ID da profissão não pode ser vazio' })
  professionId: number;
}
