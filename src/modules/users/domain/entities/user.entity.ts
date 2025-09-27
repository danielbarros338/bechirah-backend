import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'Identificador único do usuário' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({
    example: 'joao@teste.com',
    description: 'Endereço de e-mail do usuário',
  })
  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @ApiProperty({
    example: 'joaoSilva123',
    description: 'Nome de usuário único',
  })
  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @ApiProperty({
    example: 'Teste@123!',
    description: 'Senha do usuário',
  })
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Regra de acesso do usuário',
  })
  @Column({ type: 'varchar', length: 20 })
  role: string;

  @ApiProperty({
    example: 'true',
    description: 'Indica se o usuário está ativo',
  })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ApiProperty({
    example: '2025-12-31T23:59:59Z',
    description: 'Data de criação do usuário',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    example: '2025-12-31T23:59:59Z',
    description: 'Data da última atualização do usuário',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2025-12-31T23:59:59Z',
    description: 'Data de exclusão do usuário (soft delete)',
  })
  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
