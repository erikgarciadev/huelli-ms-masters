import { CompanyView } from '../entities/CompanyView.entity';

export interface CompanyViewRepository {
  findAll(): Promise<CompanyView[]>;
  findById(id: string): Promise<CompanyView | null>;
}
