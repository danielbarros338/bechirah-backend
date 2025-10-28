import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateSelectedCurriculumUseCase } from './application/use-cases/CreateSelectedCurriculum.use-case';
import { DeleteSelectedCurriculumUseCase } from './application/use-cases/DeleteSelectedCurriculum.use-case';
import { GetAllSelectedCurriculumnsUseCase } from './application/use-cases/GetAllSelectedCurriculumns.use-case';
import { GetOneSelectedCurriculumUseCase } from './application/use-cases/GetOneSelectedCurriculum.use-case';
import { SoftDeleteSelectedCurriculumUseCase } from './application/use-cases/SoftDeleteSelectedCurriculum.use-case';
import { UpdateSelectedCurriculumUseCase } from './application/use-cases/UpdateSelectedCurriculum.use-case';
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
    GetOneSelectedCurriculumUseCase,
    GetAllSelectedCurriculumnsUseCase,
    UpdateSelectedCurriculumUseCase,
    SoftDeleteSelectedCurriculumUseCase,
    DeleteSelectedCurriculumUseCase,
  ],
  exports: [],
})
export class CurriculumModule {}
