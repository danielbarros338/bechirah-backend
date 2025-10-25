import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Roles } from '../../../../shared/enums/Roles.enum';

export class CreateUserDTO {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @Length(3, 50, { message: 'O nome deve ter entre 3 e 50 caracteres' })
  name: string;

  @ApiProperty({
    example: 'foo@bar.com',
    description: 'Endereço de e-mail do usuário',
  })
  @IsEmail({}, { message: 'O e-mail deve ser válido' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  @Length(5, 150, { message: 'O e-mail deve ter entre 5 e 150 caracteres' })
  email: string;

  @ApiProperty({ example: 'fooBar123', description: 'Nome de usuário único' })
  @IsString({ message: 'O nome de usuário deve ser uma string' })
  @IsNotEmpty({ message: 'O nome de usuário não pode estar vazio' })
  @Length(3, 50, {
    message: 'O nome de usuário deve ter entre 3 e 50 caracteres',
  })
  username: string;

  @ApiProperty({ example: 'Senha@123', description: 'Senha do usuário' })
  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @Length(8, 20, { message: 'A senha deve ter entre 8 e 20 caracteres' })
  password: string;

  @ApiProperty({ example: 'ADMIN', description: 'Regra de acesso do usuário' })
  @IsEnum(Roles, {
    message: `A regra deve ser um dos seguintes valores: ${Object.values(Roles).join(', ')}`,
  })
  @IsNotEmpty({ message: 'A regra não pode estar vazia' })
  role: Roles;

  @ApiProperty({
    example: true,
    description: 'Indica se o usuário está ativo',
  })
  @IsBoolean({ message: 'isActive deve ser um valor booleano' })
  @IsNotEmpty({ message: 'isActive não pode estar vazio' })
  isActive: boolean;
}
