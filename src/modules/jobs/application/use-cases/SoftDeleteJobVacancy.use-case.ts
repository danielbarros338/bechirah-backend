import { Inject, Injectable } from '@nestjs/common';
import { DeleteJobVacancyDTO } from '../dtos/deleteJobVacancy.dto';
import type { IJobVacancyRepository } from '../ports/jobVacancyRepository.port';
import { GetOneJobVacancyUseCase } from './GetOneJobVacancy.use-case';

@Injectable()
export class DeleteJobVacancyUseCase {
  constructor(
    @Inject('IJobVacancyRepository')
    private readonly jobVacanciesRepository: IJobVacancyRepository,
    private readonly getOneJobVacancyUseCase: GetOneJobVacancyUseCase,
  ) {}

  async delete(data: DeleteJobVacancyDTO): Promise<void> {
    await this.getOneJobVacancyUseCase.get({ id: data.id });

    await this.jobVacanciesRepository.delete(data.id);
  }
}
