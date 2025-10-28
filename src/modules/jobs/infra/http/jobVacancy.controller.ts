import { Body, Controller, HttpStatus, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponse } from '../../../../shared/dtos/appResponse.dto';
import { CreateJobVacancyDTO } from '../../application/dtos/createJobVacancy.dto';
import { CreateJobVacancyUseCase } from '../../application/use-cases/CreateJobVacancy.use-case';

@ApiTags('Vagas de Emprego')
@Controller('job-vacancies')
export class JobVacancyController {
  private readonly logger = new Logger(JobVacancyController.name);

  constructor(
    private readonly createJobVacancyUseCase: CreateJobVacancyUseCase,
  ) {}

  @Post('create')
  async createJobVacancy(
    @Body() data: CreateJobVacancyDTO,
  ): Promise<AppResponse> {
    try {
      const jobVacancy = await this.createJobVacancyUseCase.create(data);

      return new AppResponse(
        jobVacancy,
        'Vaga de emprego criada com sucesso',
        HttpStatus.CREATED,
      );
    } catch (error: any) {
      this.logger.error('Erro ao criar vaga de emprego', error.stack);

      throw error;
    }
  }
}
