import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { IJobVacancyRepository } from '../../application/ports/jobVacancyRepository.port';
import { JobVacancy as DomainJobVacancy } from '../../domain/entities/JobVacancy.entity';
import { JobVacancyMapper } from '../mappers/jobVacancy.mapper';
import { JobVacancy as OrmJobVacancy } from '../orm-entities/jobVacancy.ormEntity';

@Injectable()
export class JobVacancyRepository implements IJobVacancyRepository {
  private readonly logger = new Logger(JobVacancyRepository.name);

  constructor(
    @InjectRepository(OrmJobVacancy)
    private readonly jobVacancyRepo: Repository<OrmJobVacancy>,
    private readonly jobVacancyMapper: JobVacancyMapper,
  ) {}

  async create(
    data: DomainJobVacancy,
    manager?: EntityManager,
  ): Promise<DomainJobVacancy> {
    try {
      if (manager) {
        const repository = manager.getRepository(OrmJobVacancy);
        const orm = this.jobVacancyMapper.toOrm(data);
        const created = await repository.save(orm as OrmJobVacancy);

        return this.jobVacancyMapper.toDomain(created);
      } else {
        const orm = this.jobVacancyMapper.toOrm(data);
        const created = await this.jobVacancyRepo.save(orm as OrmJobVacancy);

        return this.jobVacancyMapper.toDomain(created);
      }
    } catch (error: any) {
      this.logger.error(
        `Error creating job vacancy: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to create job vacancy');
    }
  }

  async update(
    data: DomainJobVacancy,
    manager?: EntityManager,
  ): Promise<DomainJobVacancy> {
    try {
      if (manager) {
        const repository = manager.getRepository(OrmJobVacancy);
        const orm = this.jobVacancyMapper.toOrm(data);
        const updated = await repository.save(orm as OrmJobVacancy);

        return this.jobVacancyMapper.toDomain(updated);
      } else {
        const orm = this.jobVacancyMapper.toOrm(data);
        const updated = await this.jobVacancyRepo.save(orm as OrmJobVacancy);

        return this.jobVacancyMapper.toDomain(updated);
      }
    } catch (error: any) {
      this.logger.error(
        `Error updating job vacancy: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to update job vacancy');
    }
  }

  async delete(id: number, manager?: EntityManager): Promise<void> {
    try {
      if (manager) {
        const repository = manager.getRepository(OrmJobVacancy);
        const entity = await repository.findOneBy({ id });

        if (entity) {
          await repository.remove(entity);
        }
      } else {
        const entity = await this.jobVacancyRepo.findOneBy({ id });

        if (entity) {
          await this.jobVacancyRepo.remove(entity);
        }
      }
    } catch (error: any) {
      this.logger.error(
        `Error deleting job vacancy: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to delete job vacancy');
    }
  }

  async softDelete(id: number, manager?: EntityManager): Promise<void> {
    try {
      if (manager) {
        const repository = manager.getRepository(OrmJobVacancy);
        await repository.softDelete(id);
      } else {
        await this.jobVacancyRepo.softDelete(id);
      }
    } catch (error: any) {
      this.logger.error(
        `Error soft deleting job vacancy: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to soft delete job vacancy');
    }
  }

  async findById(id: number): Promise<DomainJobVacancy | null> {
    try {
      const orm = await this.jobVacancyRepo.findOneBy({ id });

      if (!orm) return null;

      return this.jobVacancyMapper.toDomain(orm);
    } catch (error: any) {
      this.logger.error(
        `Error finding job vacancy by ID: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to find job vacancy by ID');
    }
  }

  async findAllByExperienceTime(
    experienceTime: number,
  ): Promise<DomainJobVacancy[]> {
    try {
      const ormList = await this.jobVacancyRepo.find({
        where: { experienceTime },
      });

      return ormList.map((o) => this.jobVacancyMapper.toDomain(o));
    } catch (error: any) {
      this.logger.error(
        `Error finding job vacancies by experience time: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to find job vacancies by experience time');
    }
  }

  async findAllByType(type: string): Promise<DomainJobVacancy[]> {
    try {
      const ormList = await this.jobVacancyRepo.find({ where: { type } });

      return ormList.map((o) => this.jobVacancyMapper.toDomain(o));
    } catch (error: any) {
      this.logger.error(
        `Error finding job vacancies by type: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to find job vacancies by type');
    }
  }

  async findAllByLocation(location: string): Promise<DomainJobVacancy[]> {
    try {
      const ormList = await this.jobVacancyRepo.find({ where: { location } });

      return ormList.map((o) => this.jobVacancyMapper.toDomain(o));
    } catch (error: any) {
      this.logger.error(
        `Error finding job vacancies by location: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to find job vacancies by location');
    }
  }

  async findAll(): Promise<DomainJobVacancy[]> {
    try {
      const ormList = await this.jobVacancyRepo.find();

      return ormList.map((o) => this.jobVacancyMapper.toDomain(o));
    } catch (error: any) {
      this.logger.error(
        `Error finding all job vacancies: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to find all job vacancies');
    }
  }
}
