import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponse } from '../../../../shared/dtos/appResponse.dto';
import { CreateSelectedCurriculumDTO } from '../../application/dtos/createSelectedCurriculum.dto';
import { DeleteSelectedCurriculumDTO } from '../../application/dtos/deleteSelectedCurriculum.dto';
import { GetOneSelectedCurriculumDTO } from '../../application/dtos/getOneSelectedCurriculum.dto';
import { UpdateSelectedCurriculumDTO } from '../../application/dtos/updateSelectedCurriculum.dto';
import { CreateSelectedCurriculumUseCase } from '../../application/use-cases/CreateSelectedCurriculum.use-case';
import { DeleteSelectedCurriculumUseCase } from '../../application/use-cases/DeleteSelectedCurriculum.use-case';
import { GetAllSelectedCurriculumnsUseCase } from '../../application/use-cases/GetAllSelectedCurriculumns.use-case';
import { GetOneSelectedCurriculumUseCase } from '../../application/use-cases/GetOneSelectedCurriculum.use-case';
import { SoftDeleteSelectedCurriculumUseCase } from '../../application/use-cases/SoftDeleteSelectedCurriculum.use-case';
import { UpdateSelectedCurriculumUseCase } from '../../application/use-cases/UpdateSelectedCurriculum.use-case';

@ApiTags('Currículos Selecionados')
@Controller('selected-curriculumns')
export class SelectedCurriculumnsController {
  private readonly logger = new Logger(SelectedCurriculumnsController.name);

  constructor(
    private readonly createSelectedCurriculumUseCase: CreateSelectedCurriculumUseCase,
    private readonly getOneSelectedCurriculumUseCase: GetOneSelectedCurriculumUseCase,
    private readonly getAllSelectedCurriculumnsUseCase: GetAllSelectedCurriculumnsUseCase,
    private readonly updateSelectedCurriculumUseCase: UpdateSelectedCurriculumUseCase,
    private readonly softDeleteSelectedCurriculumUseCase: SoftDeleteSelectedCurriculumUseCase,
    private readonly deleteSelectedCurriculumUseCase: DeleteSelectedCurriculumUseCase,
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

  @Get('get-one/:id')
  async getOneSelectedCurriculum(
    @Param('id') id: string,
  ): Promise<AppResponse> {
    try {
      const idNumber = parseInt(id);

      if (isNaN(idNumber)) {
        throw new Error('O id deve ser um número válido');
      }

      const curriculum = await this.getOneSelectedCurriculumUseCase.get({
        id: idNumber,
      } as GetOneSelectedCurriculumDTO);

      return new AppResponse(
        curriculum,
        'Currículo selecionado recuperado com sucesso',
        HttpStatus.OK,
      );
    } catch (error: any) {
      this.logger.error('Erro ao recuperar currículo selecionado', error.stack);

      throw error;
    }
  }

  @Get('get-all')
  async getAllSelectedCurriculumns(
    @Query('professionId') professionId?: string,
  ): Promise<AppResponse> {
    try {
      const professionIdNumber = professionId
        ? parseInt(professionId)
        : undefined;

      const items =
        await this.getAllSelectedCurriculumnsUseCase.getAll(professionIdNumber);

      return new AppResponse(
        items,
        'Currículos selecionados recuperados com sucesso',
        HttpStatus.OK,
      );
    } catch (error: any) {
      this.logger.error(
        'Erro ao recuperar currículos selecionados',
        error.stack,
      );

      throw error;
    }
  }

  @Patch('update')
  async updateSelectedCurriculum(
    @Body() data: UpdateSelectedCurriculumDTO,
  ): Promise<AppResponse> {
    try {
      const updated = await this.updateSelectedCurriculumUseCase.update(data);

      return new AppResponse(
        updated,
        'Currículo atualizado com sucesso',
        HttpStatus.OK,
      );
    } catch (error: any) {
      this.logger.error('Erro ao atualizar currículo selecionado', error.stack);

      throw error;
    }
  }

  @Delete('soft-delete/:id')
  async softDeleteSelectedCurriculum(
    @Param('id') id: string,
  ): Promise<AppResponse> {
    try {
      const idNumber = parseInt(id);

      if (isNaN(idNumber)) {
        throw new Error('O id deve ser um número válido');
      }

      await this.softDeleteSelectedCurriculumUseCase.softDelete({
        id: idNumber,
      } as DeleteSelectedCurriculumDTO);

      return new AppResponse(
        null,
        'Currículo desativado com sucesso',
        HttpStatus.OK,
      );
    } catch (error: any) {
      this.logger.error('Erro ao desativar currículo selecionado', error.stack);

      throw error;
    }
  }

  @Delete('delete/:id')
  async deleteSelectedCurriculum(
    @Param('id') id: string,
  ): Promise<AppResponse> {
    try {
      const idNumber = parseInt(id);

      if (isNaN(idNumber)) {
        throw new Error('O id deve ser um número válido');
      }

      await this.deleteSelectedCurriculumUseCase.delete({
        id: idNumber,
      } as DeleteSelectedCurriculumDTO);

      return new AppResponse(
        null,
        'Currículo excluído com sucesso',
        HttpStatus.OK,
      );
    } catch (error: any) {
      this.logger.error('Erro ao excluir currículo selecionado', error.stack);

      throw error;
    }
  }
}
