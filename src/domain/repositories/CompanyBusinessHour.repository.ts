import { CompanyBusinessHour } from '../entities/CompanyBusinessHour.entity';

export interface CompanyBusinessHourRepository {
  findAll(): Promise<CompanyBusinessHour[]>;
  findById(id: string): Promise<CompanyBusinessHour | null>;
  save(entity: Partial<CompanyBusinessHour>): Promise<CompanyBusinessHour>;
  delete(id: string): Promise<void>;
}
