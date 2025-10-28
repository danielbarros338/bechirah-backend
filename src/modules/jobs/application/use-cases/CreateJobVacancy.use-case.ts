import { Inject, Injectable } from '@nestjs/common';
import { JobVacancy } from '../../domain/entities/JobVacancy.entity';
import { CreateJobVacancyDTO } from '../dtos/createJobVacancy.dto';
import type { IJobVacancyRepository } from '../ports/jobVacancyRepository.port';

@Injectable()
export class CreateJobVacancyUseCase {
  constructor(
    @Inject('IJobVacancyRepository')
    private readonly jobVacancyRepository: IJobVacancyRepository,
  ) {}

  async create(data: CreateJobVacancyDTO): Promise<JobVacancy> {
    const jobVacancy = JobVacancy.create(data);

    return await this.jobVacancyRepository.create(jobVacancy);
  }
}
