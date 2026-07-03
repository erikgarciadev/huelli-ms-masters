import { CompanyCategory } from '../entities/CompanyCategory.entity';

export interface CompanyCategoryRepository {
  findAll(): Promise<CompanyCategory[]>;
  findById(id: string): Promise<CompanyCategory | null>;
  save(entity: Partial<CompanyCategory>): Promise<CompanyCategory>;
  setActive(id: string, isActive: boolean): Promise<CompanyCategory | null>;
}
