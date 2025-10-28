import { Inject, Injectable } from '@nestjs/common';
import { JobVacancy } from '../../domain/entities/JobVacancy.entity';
import { UpdateJobVacancyDTO } from '../dtos/updateJobVacancy.dto';
import type { IJobVacancyRepository } from '../ports/jobVacancyRepository.port';
import { GetOneJobVacancyUseCase } from './GetOneJobVacancy.use-case';

@Injectable()
export class UpdateJobVacancyUseCase {
  constructor(
    @Inject('IJobVacancyRepository')
    private readonly jobVacanciesRepository: IJobVacancyRepository,
    private readonly getOneJobVacancyUseCase: GetOneJobVacancyUseCase,
  ) {}

  async update(data: UpdateJobVacancyDTO): Promise<JobVacancy> {
    const jobVacancy = await this.getOneJobVacancyUseCase.get({ id: data.id });

    const updatedJobVacancy = JobVacancy.create({
      id: jobVacancy.idValue,
      title: data.title ?? jobVacancy.titleValue,
      experienceTime: data.experienceTime ?? jobVacancy.experienceTimeValue,
      type: data.type ?? jobVacancy.typeValue,
      location: data.location ?? jobVacancy.locationValue,
      cutRanking: data.cutRanking ?? jobVacancy.cutRankingValue,
      description: data.description ?? jobVacancy.descriptionValue,
      emailTitle: data.emailTitle ?? jobVacancy.emailTitleValue,
      createdAt: jobVacancy.createdAtValue,
      updatedAt: new Date(),
    });

    return await this.jobVacanciesRepository.update(updatedJobVacancy);
  }
}
