import { EntityManager } from 'typeorm';
import { SelectedCurriculum } from '../../domain/entities/SelectedCurriculum.entity';

export interface ISelectedCurriculumnsRepository {
  create(
    data: SelectedCurriculum,
    manager?: EntityManager,
  ): Promise<SelectedCurriculum>;
  update(
    data: SelectedCurriculum,
    manager?: EntityManager,
  ): Promise<SelectedCurriculum>;
  delete(id: number, manager?: EntityManager): Promise<void>;
  softDelete(id: number, manager?: EntityManager): Promise<void>;
  findById(
    id: number,
    manager?: EntityManager,
  ): Promise<SelectedCurriculum | null>;
  findByProfessionId(
    professionId: number,
    manager?: EntityManager,
  ): Promise<SelectedCurriculum[]>;
  findAll(manager?: EntityManager): Promise<SelectedCurriculum[]>;
}
