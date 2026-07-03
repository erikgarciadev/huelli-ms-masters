import { CompanyProfile } from '../entities/CompanyProfile.entity';

export interface CompanyProfileRepository {
  findAll(): Promise<CompanyProfile[]>;
  findById(id: string): Promise<CompanyProfile | null>;
  save(entity: Partial<CompanyProfile>): Promise<CompanyProfile>;
  softDelete(id: string): Promise<void>;
}
