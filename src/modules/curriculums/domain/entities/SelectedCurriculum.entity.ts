import { Id } from '../../../../shared/valueObjects/idUser.vo';
import { Name } from '../../../../shared/valueObjects/name.vo';
import { SelectedCurriculumProp } from '../props/selectedCurriculum.prop';
import { Ranking } from '../value-objects/ranking.vo';
import { Review } from '../value-objects/review.vo';

export class SelectedCurriculum {
  constructor(
    private id: Id,
    private name: Name,
    private ranking: Ranking,
    private review: Review,
    private professionId: Id,
  ) {}

  get idValue(): number | null {
    return this.id.value;
  }

  get nameValue(): string {
    return this.name.value;
  }

  get rankingValue(): number {
    return this.ranking.value;
  }

  get reviewValue(): string {
    return this.review.value;
  }

  get professionIdValue(): number | null {
    return this.professionId.value;
  }

  static create(data: SelectedCurriculumProp): SelectedCurriculum {
    return new SelectedCurriculum(
      Id.create(data.id ?? null),
      Name.create(data.name),
      Ranking.create(data.ranking),
      Review.create(data.review),
      Id.create(data.professionId),
    );
  }
}
