export type JobVacancyProp = {
  id?: number | null;
  title: string;
  experienceTime: number;
  type: string;
  location: string;
  cutRanking: number;
  emailTitle: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
};
