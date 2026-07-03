import { CompanyLocation } from '../entities/CompanyLocation.entity';

export interface CompanyLocationRepository {
  findAll(): Promise<CompanyLocation[]>;
  findById(id: string): Promise<CompanyLocation | null>;
  save(entity: Partial<CompanyLocation>): Promise<CompanyLocation>;
  delete(id: string): Promise<void>;
}
