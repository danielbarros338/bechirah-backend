import { Inject, Injectable } from '@nestjs/common';
import { SelectedCurriculum } from '../../domain/entities/SelectedCurriculum.entity';
import { GetOneSelectedCurriculumDTO } from '../dtos/getOneSelectedCurriculum.dto';
import type { ISelectedCurriculumnsRepository } from '../ports/selectedCurriculumnsRepository.port';

@Injectable()
export class GetOneSelectedCurriculumUseCase {
  constructor(
    @Inject('ISelectedCurriculumnsRepository')
    private readonly selectedCurriculumnsRepository: ISelectedCurriculumnsRepository,
  ) {}

  async get(data: GetOneSelectedCurriculumDTO): Promise<SelectedCurriculum> {
    const selected = await this.selectedCurriculumnsRepository.findById(
      data.id,
    );

    if (!selected) {
      throw new Error('Currículo selecionado não encontrado');
    }

    return selected;
  }
}
