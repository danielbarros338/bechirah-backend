import { Inject, Injectable } from '@nestjs/common';
import { JobVacancy } from '../../domain/entities/JobVacancy.entity';
import { GetOneJobVacancyDTO } from '../dtos/getOneJobVacancy.dto';
import type { IJobVacancyRepository } from '../ports/jobVacancyRepository.port';

@Injectable()
export class GetOneJobVacancyUseCase {
  constructor(
    @Inject('IJobVacancyRepository')
    private readonly jobVacanciesRepository: IJobVacancyRepository,
  ) {}

  async get(data: GetOneJobVacancyDTO): Promise<JobVacancy> {
    const jobVacancy = await this.jobVacanciesRepository.findById(data.id);

    if (!jobVacancy) {
      throw new Error('Vaga de emprego não encontrada');
    }

    return jobVacancy;
  }
}
