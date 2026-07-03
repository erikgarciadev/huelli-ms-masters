import { CompanyLocationView } from '../entities/CompanyLocationView.entity';

export interface CompanyLocationViewRepository {
  findAll(): Promise<CompanyLocationView[]>;
  findById(id: string): Promise<CompanyLocationView | null>;
}
