import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Roles } from '../../../../shared/enums/Roles.enum';

export class UpdateUserDTO {
  @ApiPropertyOptional({ example: 1, description: 'Id do usuário' })
  @IsInt({ message: 'O id deve ser um número inteiro' })
  @IsNotEmpty({ message: 'O id é obrigatório' })
  id: number;

  @ApiPropertyOptional({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  @Length(3, 50, { message: 'O nome deve ter entre 3 e 50 caracteres' })
  name?: string;

  @ApiPropertyOptional({
    example: 'foo@bar.com',
    description: 'Email do usuário',
  })
  @IsOptional()
  @IsEmail({}, { message: 'O e-mail deve ser válido' })
  email?: string;

  @ApiPropertyOptional({
    example: 'novoUsuario',
    description: 'Nome de usuário',
  })
  @IsOptional()
  @IsString({ message: 'O nome de usuário deve ser uma string' })
  username?: string;

  @ApiPropertyOptional({
    example: 'NovaSenha@123',
    description: 'Senha do usuário',
  })
  @IsOptional()
  @IsString({ message: 'A senha deve ser uma string' })
  @Length(8, 20, { message: 'A senha deve ter entre 8 e 20 caracteres' })
  password?: string;

  @ApiPropertyOptional({ example: Roles.USER, description: 'Regra do usuário' })
  @IsOptional()
  @IsEnum(Roles)
  role?: Roles;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica se usuário está ativo',
  })
  @IsOptional()
  @IsBoolean({ message: 'isActive deve ser booleano' })
  isActive?: boolean;
}
