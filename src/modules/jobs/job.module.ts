import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateJobVacancyUseCase } from './application/use-cases/CreateJobVacancy.use-case';
import { SoftDeleteJobVacancyUseCase } from './application/use-cases/DeleteJobVacancy.use-case';
import { GetOneJobVacancyUseCase } from './application/use-cases/GetOneJobVacancy.use-case';
import { DeleteJobVacancyUseCase } from './application/use-cases/SoftDeleteJobVacancy.use-case';
import { UpdateJobVacancyUseCase } from './application/use-cases/UpdateJobVacancy.use-case';
import { JobVacancyController } from './infra/http/jobVacancy.controller';
import { JobVacancyMapper } from './infra/mappers/jobVacancy.mapper';
import { JobVacancy } from './infra/orm-entities/jobVacancy.ormEntity';
import { JobVacancyRepository } from './infra/repositories/jobVacancy.repository';

@Module({
  imports: [TypeOrmModule.forFeature([JobVacancy])],
  controllers: [JobVacancyController],
  providers: [
    {
      provide: 'IJobVacancyRepository',
      useClass: JobVacancyRepository,
    },
    JobVacancyMapper,
    CreateJobVacancyUseCase,
    GetOneJobVacancyUseCase,
    UpdateJobVacancyUseCase,
    SoftDeleteJobVacancyUseCase,
    DeleteJobVacancyUseCase,
  ],
  exports: [],
})
export class JobModule {}
