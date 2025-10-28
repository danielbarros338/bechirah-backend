import { Inject, Injectable } from '@nestjs/common';
import { SelectedCurriculum } from '../../domain/entities/SelectedCurriculum.entity';
import { UpdateSelectedCurriculumDTO } from '../dtos/updateSelectedCurriculum.dto';
import type { ISelectedCurriculumnsRepository } from '../ports/selectedCurriculumnsRepository.port';

@Injectable()
export class UpdateSelectedCurriculumUseCase {
  constructor(
    @Inject('ISelectedCurriculumnsRepository')
    private readonly selectedCurriculumnsRepository: ISelectedCurriculumnsRepository,
  ) {}

  async update(data: UpdateSelectedCurriculumDTO): Promise<SelectedCurriculum> {
    const existing = await this.selectedCurriculumnsRepository.findById(
      data.id,
    );

    if (!existing) {
      throw new Error('Currículo selecionado não encontrado');
    }

    const updated = SelectedCurriculum.create({
      id: data.id,
      name: data.name ?? existing.nameValue,
      ranking: data.ranking ?? existing.rankingValue,
      review: data.review ?? existing.reviewValue,
      professionId: data.professionId ?? (existing.professionIdValue as number),
    });

    return await this.selectedCurriculumnsRepository.update(updated);
  }
}
