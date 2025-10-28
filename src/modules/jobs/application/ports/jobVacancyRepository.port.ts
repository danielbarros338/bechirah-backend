import { EntityManager } from 'typeorm';
import { JobVacancy } from '../../domain/entities/JobVacancy.entity';

export interface IJobVacancyRepository {
  create(data: JobVacancy, manager?: EntityManager): Promise<JobVacancy>;
  update(data: JobVacancy, manager?: EntityManager): Promise<JobVacancy>;
  delete(id: number, manager?: EntityManager): Promise<void>;
  softDelete(id: number, manager?: EntityManager): Promise<void>;
  findById(id: number): Promise<JobVacancy | null>;
  findAllByExperienceTime(experienceTime: number): Promise<JobVacancy[]>;
  findAllByType(type: string): Promise<JobVacancy[]>;
  findAllByLocation(location: string): Promise<JobVacancy[]>;
  findAll(): Promise<JobVacancy[]>;
}
