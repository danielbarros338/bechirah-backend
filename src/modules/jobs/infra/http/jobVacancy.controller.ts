import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponse } from '../../../../shared/dtos/appResponse.dto';
import { CreateJobVacancyDTO } from '../../application/dtos/createJobVacancy.dto';
import { UpdateJobVacancyDTO } from '../../application/dtos/updateJobVacancy.dto';
import { CreateJobVacancyUseCase } from '../../application/use-cases/CreateJobVacancy.use-case';
import { SoftDeleteJobVacancyUseCase } from '../../application/use-cases/DeleteJobVacancy.use-case';
import { GetOneJobVacancyUseCase } from '../../application/use-cases/GetOneJobVacancy.use-case';
import { DeleteJobVacancyUseCase } from '../../application/use-cases/SoftDeleteJobVacancy.use-case';
import { UpdateJobVacancyUseCase } from '../../application/use-cases/UpdateJobVacancy.use-case';

@ApiTags('Vagas de Emprego')
@Controller('job-vacancies')
export class JobVacancyController {
  private readonly logger = new Logger(JobVacancyController.name);

  constructor(
    private readonly createJobVacancyUseCase: CreateJobVacancyUseCase,
    private readonly getOneJobVacancyUseCase: GetOneJobVacancyUseCase,
    private readonly updateJobVacancyUseCase: UpdateJobVacancyUseCase,
    private readonly softDeleteJobVacancyUseCase: SoftDeleteJobVacancyUseCase,
    private readonly deleteJobVacancyUseCase: DeleteJobVacancyUseCase,
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

  @Get('get-one/:id')
  async getOneJobVacancy(@Body('id') id: string): Promise<AppResponse> {
    try {
      const idNumber = parseInt(id);

      if (isNaN(idNumber)) {
        throw new Error('O id da vaga deve ser um número válido');
      }

      const jobVacancy = await this.getOneJobVacancyUseCase.get({
        id: idNumber,
      });

      return new AppResponse(
        jobVacancy,
        'Vaga de emprego recuperada com sucesso',
        HttpStatus.OK,
      );
    } catch (error: any) {
      this.logger.error('Erro ao recuperar vaga de emprego', error.stack);

      throw error;
    }
  }

  @Patch('update')
  async updateJobVacancy(
    @Body() data: UpdateJobVacancyDTO,
  ): Promise<AppResponse> {
    try {
      const updatedJobVacancy = await this.updateJobVacancyUseCase.update(data);

      return new AppResponse(
        updatedJobVacancy,
        'Vaga de emprego atualizada com sucesso',
        HttpStatus.OK,
      );
    } catch (error: any) {
      this.logger.error('Erro ao atualizar vaga de emprego', error.stack);

      throw error;
    }
  }

  @Delete('soft-delete/:id')
  async softDeleteJobVacancy(@Body('id') id: string): Promise<AppResponse> {
    try {
      const idNumber = parseInt(id);

      if (isNaN(idNumber)) {
        throw new Error('O id da vaga deve ser um número válido');
      }

      await this.softDeleteJobVacancyUseCase.softDelete({ id: idNumber });

      return new AppResponse(
        null,
        'Vaga de emprego desativada com sucesso',
        HttpStatus.OK,
      );
    } catch (error: any) {
      this.logger.error('Erro ao desativar vaga de emprego', error.stack);

      throw error;
    }
  }

  @Delete('delete/:id')
  async deleteJobVacancy(@Body('id') id: string): Promise<AppResponse> {
    try {
      const idNumber = parseInt(id);

      if (isNaN(idNumber)) {
        throw new Error('O id da vaga deve ser um número válido');
      }

      await this.deleteJobVacancyUseCase.delete({ id: idNumber });

      return new AppResponse(
        null,
        'Vaga de emprego excluída com sucesso',
        HttpStatus.OK,
      );
    } catch (error: any) {
      this.logger.error('Erro ao excluir vaga de emprego', error.stack);

      throw error;
    }
  }
}
