import { Body, Controller, HttpStatus, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponse } from '../../../../shared/dtos/appResponse.dto';
import { CreateSelectedCurriculumDTO } from '../../application/dtos/createSelectedCurriculum.dto';
import { CreateSelectedCurriculumUseCase } from '../../application/use-cases/CreateSelectedCurriculum.use-case';

@ApiTags('Currículos Selecionados')
@Controller('selected-curriculumns')
export class SelectedCurriculumnsController {
  private readonly logger = new Logger(SelectedCurriculumnsController.name);

  constructor(
    private readonly createSelectedCurriculumUseCase: CreateSelectedCurriculumUseCase,
  ) {}

  @Post('create')
  async createSelectedCurriculum(
    @Body() data: CreateSelectedCurriculumDTO,
  ): Promise<AppResponse> {
    try {
      const createdCurriculum =
        await this.createSelectedCurriculumUseCase.create(data);

      return new AppResponse(
        createdCurriculum,
        'Selected curriculum created successfully',
        HttpStatus.CREATED,
      );
    } catch (error: any) {
      this.logger.error(
        `Error in createSelectedCurriculum: ${error.message}`,
        error.stack,
      );

      throw error;
    }
  }
}
