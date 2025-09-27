import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('jobVacancies')
export class JobVacancy {
  @ApiProperty({
    example: 1,
    description: 'Identificador único da vaga de emprego',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({
    example: 'Desenvolvedor Full Stack',
    description: 'Título da vaga de emprego',
  })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({
    example: '3',
    description: 'Nível de experiência exigido para a vaga (em anos)',
  })
  @Column({ type: 'int' })
  experienceTime: number;

  @ApiProperty({
    example: 'CLT',
    description: 'Tipo de contratação (e.g., CLT, PJ, Freelancer)',
  })
  @Column({ type: 'varchar', length: 50 })
  type: string;

  @ApiProperty({
    example: 'São Paulo, SP',
    description: 'Localização da vaga de emprego',
  })
  @Column({ type: 'varchar', length: 255 })
  location: string;

  @ApiProperty({
    example: 4.5,
    description: 'Nota de corte mínima para a vaga',
  })
  @Column({ type: 'float' })
  cutRanking: number;

  @ApiProperty({
    example: 'CURRÍCULO DESENVOLVEDOR FULL STACK',
    description: 'Título de email esperado receber para a vaga',
  })
  @Column({ type: 'varchar', length: 255 })
  emailTitle: string;

  @ApiProperty({
    example:
      'Preciso de um desenvolvedor full stack com experiência em Node.js e React.',
    description: 'Descrição detalhada da vaga de emprego',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    example: '2023-10-05T14:48:00.000Z',
    description: 'Data e hora de criação do registro',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    example: '2023-10-05T14:48:00.000Z',
    description: 'Data e hora da última atualização do registro',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2023-10-12T14:48:00.000Z',
    description: 'Data e hora de fechamento da vaga de emprego',
  })
  @Column({ type: 'timestamp', nullable: true })
  closedAt: Date | null;

  @ApiProperty({
    example: '2023-10-12T14:48:00.000Z',
    description: 'Data e hora da exclusão do registro (se aplicável)',
  })
  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
