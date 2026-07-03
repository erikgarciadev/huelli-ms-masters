import { Identity } from '../entities/Identity.entity';

export interface IdentityRepository {
  findAll(): Promise<Identity[]>;
  findById(id: string): Promise<Identity | null>;
  save(entity: Partial<Identity>): Promise<Identity>;
  softDelete(id: string): Promise<void>;
}
