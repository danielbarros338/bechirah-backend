import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateJobVacancyUseCase } from './application/use-cases/CreateJobVacancy.use-case';
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
  ],
  exports: [],
})
export class JobModule {}
