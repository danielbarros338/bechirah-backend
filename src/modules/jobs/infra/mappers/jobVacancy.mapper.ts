import { Injectable } from '@nestjs/common';
import { JobVacancy as DomainJobVacancy } from '../../domain/entities/JobVacancy.entity';
import { JobVacancyProp } from '../../domain/props/jobVacancy.prop';
import { JobVacancy as OrmJobVacancy } from '../orm-entities/jobVacancy.ormEntity';

@Injectable()
export class JobVacancyMapper {
  toDomain(orm: OrmJobVacancy): DomainJobVacancy {
    const prop: JobVacancyProp = {
      id: orm.id,
      title: orm.title,
      experienceTime: orm.experienceTime,
      type: orm.type,
      location: orm.location,
      cutRanking: orm.cutRanking,
      emailTitle: orm.emailTitle,
      description: orm.description,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      deletedAt: orm.deletedAt,
    };

    return DomainJobVacancy.create(prop);
  }

  toOrm(domain: DomainJobVacancy): Partial<OrmJobVacancy> {
    const orm: Partial<OrmJobVacancy> = {
      id: domain.idValue || undefined,
      title: domain.titleValue,
      experienceTime: domain.experienceTimeValue,
      type: domain.typeValue,
      location: domain.locationValue,
      cutRanking: domain.cutRankingValue,
      emailTitle: domain.emailTitleValue,
      description: domain.descriptionValue,
    };

    return orm;
  }
}
