import { Inject, Injectable } from '@nestjs/common';
import { SelectedCurriculum } from '../../domain/entities/SelectedCurriculum.entity';
import { CreateSelectedCurriculumDTO } from '../dtos/createSelectedCurriculum.dto';
import type { ISelectedCurriculumnsRepository } from '../ports/selectedCurriculumnsRepository.port';

@Injectable()
export class CreateSelectedCurriculumUseCase {
  constructor(
    @Inject('ISelectedCurriculumnsRepository')
    private readonly selectedCurriculumRepository: ISelectedCurriculumnsRepository,
  ) {}

  async create(data: CreateSelectedCurriculumDTO): Promise<SelectedCurriculum> {
    const selectedCurriculum = SelectedCurriculum.create({
      id: null,
      name: data.name,
      ranking: data.ranking,
      review: data.review,
      professionId: data.professionId,
    });

    return await this.selectedCurriculumRepository.create(selectedCurriculum);
  }
}
