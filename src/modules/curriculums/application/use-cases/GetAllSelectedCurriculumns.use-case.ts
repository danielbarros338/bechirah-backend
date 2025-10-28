import { Inject, Injectable } from '@nestjs/common';
import { SelectedCurriculum } from '../../domain/entities/SelectedCurriculum.entity';
import type { ISelectedCurriculumnsRepository } from '../ports/selectedCurriculumnsRepository.port';

@Injectable()
export class GetAllSelectedCurriculumnsUseCase {
  constructor(
    @Inject('ISelectedCurriculumnsRepository')
    private readonly selectedCurriculumnsRepository: ISelectedCurriculumnsRepository,
  ) {}

  async getAll(professionId?: number): Promise<SelectedCurriculum[]> {
    if (professionId) {
      return await this.selectedCurriculumnsRepository.findByProfessionId(
        professionId,
      );
    }

    return await this.selectedCurriculumnsRepository.findAll();
  }
}
