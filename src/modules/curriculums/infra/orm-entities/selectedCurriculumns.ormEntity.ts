import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('selectedCurriculums')
export class SelectedCurriculumns {
  @ApiProperty({
    example: 1,
    description: 'Identificador único do currículo selecionado',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({
    example: 'Daniel Barros',
    description: 'Nome do candidato',
  })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({
    example: 4.75,
    description: 'Média das notas do currículo',
  })
  @Column({ type: 'float' })
  ranking: number;

  @ApiProperty({
    example: 'O candidato possui experiência em desenvolvimento web e mobile.',
    description: 'Avaliação do currículo',
  })
  @Column({ type: 'text' })
  review: string;

  @ApiProperty({
    example: 1,
    description: 'Identificador da profissão associada ao currículo',
  })
  @Column({ type: 'int' })
  professionId: number;

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
    description: 'Data e hora da exclusão do registro (se aplicável)',
  })
  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
