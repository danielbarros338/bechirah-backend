import { CreatedAt } from '../../../../shared/valueObjects/createdAt.vo';
import { DeletedAt } from '../../../../shared/valueObjects/deletedAt.vo';
import { Id } from '../../../../shared/valueObjects/idUser.vo';
import { UpdatedAt } from '../../../../shared/valueObjects/updatedAt.vo';
import { JobVacancyProp } from '../props/jobVacancy.prop';
import { CutRanking } from '../value-objects/CutRanking.vo';
import { Description } from '../value-objects/Description.vo';
import { EmailTitle } from '../value-objects/EmailTitle.vo';
import { ExperienceTime } from '../value-objects/ExperienceTime.vo';
import { Location } from '../value-objects/Location.vo';
import { Title } from '../value-objects/Title.vo';
import { TypeHiring } from '../value-objects/TypeHiring.vo';

export class JobVacancy {
  constructor(
    private id: Id,
    private title: Title,
    private experienceTime: ExperienceTime,
    private type: TypeHiring,
    private location: Location,
    private cutRanking: CutRanking,
    private emailTitle: EmailTitle,
    private description: Description,
    private createdAt: CreatedAt,
    private updatedAt: UpdatedAt,
    private deletedAt: DeletedAt,
  ) {}

  get idValue(): number | null {
    return this.id.value;
  }

  get titleValue(): string {
    return this.title.value;
  }

  get experienceTimeValue(): number {
    return this.experienceTime.value;
  }

  get typeValue(): string {
    return this.type.value;
  }

  get locationValue(): string {
    return this.location.value;
  }

  get cutRankingValue(): number {
    return this.cutRanking.value;
  }

  get emailTitleValue(): string {
    return this.emailTitle.value;
  }

  get descriptionValue(): string {
    return this.description.value;
  }

  get createdAtValue(): Date {
    return this.createdAt.value;
  }

  get updatedAtValue(): Date | null {
    return this.updatedAt.value;
  }

  get deletedAtValue(): Date | null {
    return this.deletedAt.value;
  }

  static create(data: JobVacancyProp): JobVacancy {
    return new JobVacancy(
      Id.create(data.id ?? null),
      Title.create(data.title),
      ExperienceTime.create(data.experienceTime),
      TypeHiring.create(data.type),
      Location.create(data.location),
      CutRanking.create(data.cutRanking),
      EmailTitle.create(data.emailTitle),
      Description.create(data.description),
      CreatedAt.create(data.createdAt ?? new Date()),
      UpdatedAt.create(data.updatedAt ?? null),
      DeletedAt.create(data.deletedAt ?? null),
    );
  }
}
