import { Inject, Injectable } from '@nestjs/common';
import { DeleteSelectedCurriculumDTO } from '../dtos/deleteSelectedCurriculum.dto';
import type { ISelectedCurriculumnsRepository } from '../ports/selectedCurriculumnsRepository.port';

@Injectable()
export class SoftDeleteSelectedCurriculumUseCase {
  constructor(
    @Inject('ISelectedCurriculumnsRepository')
    private readonly selectedCurriculumnsRepository: ISelectedCurriculumnsRepository,
  ) {}

  async softDelete(data: DeleteSelectedCurriculumDTO): Promise<void> {
    const existing = await this.selectedCurriculumnsRepository.findById(
      data.id,
    );

    if (!existing) {
      throw new Error('Currículo selecionado não encontrado');
    }

    await this.selectedCurriculumnsRepository.softDelete(data.id);
  }
}
