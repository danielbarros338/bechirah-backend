import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateSelectedCurriculumUseCase } from './application/use-cases/CreateSelectedCurriculum.use-case';
import { SelectedCurriculumnsController } from './infra/http/selectedCurriculumns.controller';
import { SelectedCurriculumnsMapper } from './infra/mappers/selectedCurriculumns.mapper';
import { SelectedCurriculumns } from './infra/orm-entities/selectedCurriculumns.ormEntity';
import { SelectedCurriculumnsRepository } from './infra/repositories/selectedCurriculumns.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SelectedCurriculumns])],
  controllers: [SelectedCurriculumnsController],
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
