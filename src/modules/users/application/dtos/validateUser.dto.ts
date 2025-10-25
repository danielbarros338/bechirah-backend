import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsPositive } from 'class-validator';

export class ValidateUserDTO {
  @ApiPropertyOptional({ example: 1, description: 'ID do usuário' })
  @IsInt({ message: 'O ID do usuário deve ser um número inteiro' })
  @IsPositive({ message: 'O ID do usuário deve ser um número positivo' })
  @IsOptional()
  id?: number;

  @ApiPropertyOptional({ example: 'foo@bar', description: 'Email do usuário' })
  @IsEmail({}, { message: 'O email deve ser um email válido' })
  @IsOptional()
  email?: string;
}
