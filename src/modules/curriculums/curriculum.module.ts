import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateSelectedCurriculumUseCase } from './application/use-cases/CreateSelectedCurriculum.use-case';
import { SelectedCurriculumnsMapper } from './infra/mappers/selectedCurriculumns.mapper';
import { SelectedCurriculumns } from './infra/orm-entities/selectedCurriculumns.ormEntity';
import { SelectedCurriculumnsRepository } from './infra/repositories/selectedCurriculumns.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SelectedCurriculumns])],
  controllers: [],
  providers: [
    {
      provide: 'ISelectedCurriculumnsRepository',
      useClass: SelectedCurriculumnsRepository,
    },
    SelectedCurriculumnsMapper,
    CreateSelectedCurriculumUseCase,
  ],
  exports: [],
})
export class CurriculumModule {}
