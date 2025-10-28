import { Injectable } from '@nestjs/common';
import { SelectedCurriculum as DomainSelectedCurriculum } from '../../domain/entities/SelectedCurriculum.entity';
import { SelectedCurriculumProp } from '../../domain/props/selectedCurriculum.prop';
import { SelectedCurriculumns as OrmSelectedCurriculumns } from '../orm-entities/selectedCurriculumns.ormEntity';

@Injectable()
export class SelectedCurriculumnsMapper {
  toDomain(orm: OrmSelectedCurriculumns): DomainSelectedCurriculum {
    const prop: SelectedCurriculumProp = {
      id: orm.id,
      name: orm.name,
      ranking: orm.ranking,
      review: orm.review,
      professionId: orm.professionId,
    };

    return DomainSelectedCurriculum.create(prop);
  }

  toOrm(domain: DomainSelectedCurriculum): Partial<OrmSelectedCurriculumns> {
    const orm: Partial<OrmSelectedCurriculumns> = {
      id: domain.idValue || undefined,
      name: domain.nameValue,
      ranking: domain.rankingValue,
      review: domain.reviewValue,
      professionId: domain.professionIdValue || undefined,
    };

    return orm;
  }
}
