import { CompanyService } from '../entities/CompanyService.entity';

export interface CompanyServiceRepository {
  findAll(): Promise<CompanyService[]>;
  findById(id: string): Promise<CompanyService | null>;
  save(entity: Partial<CompanyService>): Promise<CompanyService>;
  setActive(id: string, isActive: boolean): Promise<CompanyService | null>;
}
