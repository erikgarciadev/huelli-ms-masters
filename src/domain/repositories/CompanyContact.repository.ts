import { CompanyContact } from '../entities/CompanyContact.entity';

export interface CompanyContactRepository {
  findAll(): Promise<CompanyContact[]>;
  findById(id: string): Promise<CompanyContact | null>;
  save(entity: Partial<CompanyContact>): Promise<CompanyContact>;
  delete(id: string): Promise<void>;
}
