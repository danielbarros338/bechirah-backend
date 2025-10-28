import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ISelectedCurriculumnsRepository } from '../../application/ports/selectedCurriculumnsRepository.port';
import { SelectedCurriculum as DomainSelectedCurriculum } from '../../domain/entities/SelectedCurriculum.entity';
import { SelectedCurriculumnsMapper } from '../mappers/selectedCurriculumns.mapper';
import { SelectedCurriculumns as OrmSelectedCurriculumns } from '../orm-entities/selectedCurriculumns.ormEntity';

@Injectable()
export class SelectedCurriculumnsRepository
  implements ISelectedCurriculumnsRepository
{
  private readonly logger = new Logger(SelectedCurriculumnsRepository.name);

  constructor(
    @InjectRepository(OrmSelectedCurriculumns)
    private readonly selectedCurricolumnsRepo: Repository<OrmSelectedCurriculumns>,
    private readonly selectedCurriculumnsMapper: SelectedCurriculumnsMapper,
  ) {}

  async create(
    data: DomainSelectedCurriculum,
    manager?: EntityManager,
  ): Promise<DomainSelectedCurriculum> {
    try {
      const orm = this.selectedCurriculumnsMapper.toOrm(data);

      if (manager) {
        const repository = manager.getRepository(OrmSelectedCurriculumns);
        const created = await repository.save(orm as OrmSelectedCurriculumns);

        return this.selectedCurriculumnsMapper.toDomain(created);
      } else {
        const created = await this.selectedCurricolumnsRepo.save(
          orm as OrmSelectedCurriculumns,
        );

        return this.selectedCurriculumnsMapper.toDomain(created);
      }
    } catch (error: any) {
      this.logger.error(
        `Error creating selected curriculum: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to create selected curriculum');
    }
  }

  async update(
    data: DomainSelectedCurriculum,
    manager?: EntityManager,
  ): Promise<DomainSelectedCurriculum> {
    try {
      const orm = this.selectedCurriculumnsMapper.toOrm(data);

      if (manager) {
        const repository = manager.getRepository(OrmSelectedCurriculumns);
        const updated = await repository.save(orm as OrmSelectedCurriculumns);

        return this.selectedCurriculumnsMapper.toDomain(updated);
      } else {
        const updated = await this.selectedCurricolumnsRepo.save(
          orm as OrmSelectedCurriculumns,
        );

        return this.selectedCurriculumnsMapper.toDomain(updated);
      }
    } catch (error: any) {
      this.logger.error(
        `Error updating selected curriculum: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to update selected curriculum');
    }
  }

  async delete(id: number, manager?: EntityManager): Promise<void> {
    try {
      if (manager) {
        const repository = manager.getRepository(OrmSelectedCurriculumns);
        const entity = await repository.findOneBy({ id });

        if (entity) {
          await repository.remove(entity);
        }
      } else {
        const entity = await this.selectedCurricolumnsRepo.findOneBy({ id });

        if (entity) {
          await this.selectedCurricolumnsRepo.remove(entity);
        }
      }
    } catch (error: any) {
      this.logger.error(
        `Error deleting selected curriculum: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to delete selected curriculum');
    }
  }

  async softDelete(id: number, manager?: EntityManager): Promise<void> {
    try {
      if (manager) {
        const repository = manager.getRepository(OrmSelectedCurriculumns);
        await repository.softDelete(id);
      } else {
        await this.selectedCurricolumnsRepo.softDelete(id);
      }
    } catch (error: any) {
      this.logger.error(
        `Error soft deleting selected curriculum: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to soft delete selected curriculum');
    }
  }

  async findById(
    id: number,
    manager?: EntityManager,
  ): Promise<DomainSelectedCurriculum | null> {
    try {
      if (manager) {
        const repository = manager.getRepository(OrmSelectedCurriculumns);
        const orm = await repository.findOneBy({ id });

        if (!orm) return null;

        return this.selectedCurriculumnsMapper.toDomain(orm);
      } else {
        const orm = await this.selectedCurricolumnsRepo.findOneBy({ id });

        if (!orm) return null;

        return this.selectedCurriculumnsMapper.toDomain(orm);
      }
    } catch (error: any) {
      this.logger.error(
        `Error finding selected curriculum by ID: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to find selected curriculum by ID');
    }
  }

  async findByProfessionId(
    professionId: number,
    manager?: EntityManager,
  ): Promise<DomainSelectedCurriculum[]> {
    try {
      if (manager) {
        const repository = manager.getRepository(OrmSelectedCurriculumns);
        const ormList = await repository.find({ where: { professionId } });

        return ormList.map((o) => this.selectedCurriculumnsMapper.toDomain(o));
      } else {
        const ormList = await this.selectedCurricolumnsRepo.find({
          where: { professionId },
        });

        return ormList.map((o) => this.selectedCurriculumnsMapper.toDomain(o));
      }
    } catch (error: any) {
      this.logger.error(
        `Error finding selected curriculums by professionId: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to find selected curriculums by professionId');
    }
  }

  async findAll(manager?: EntityManager): Promise<DomainSelectedCurriculum[]> {
    try {
      if (manager) {
        const repository = manager.getRepository(OrmSelectedCurriculumns);
        const ormList = await repository.find();

        return ormList.map((o) => this.selectedCurriculumnsMapper.toDomain(o));
      } else {
        const ormList = await this.selectedCurricolumnsRepo.find();

        return ormList.map((o) => this.selectedCurriculumnsMapper.toDomain(o));
      }
    } catch (error: any) {
      this.logger.error(
        `Error finding all selected curriculums: ${error.message}`,
        error.stack,
      );

      throw new Error('Failed to find all selected curriculums');
    }
  }
}
