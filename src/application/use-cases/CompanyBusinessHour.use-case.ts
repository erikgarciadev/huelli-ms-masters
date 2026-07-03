import { CompanyBusinessHour } from '../../domain/entities/CompanyBusinessHour.entity';
import { CompanyBusinessHourRepository } from '../../domain/repositories/CompanyBusinessHour.repository';

export class CompanyBusinessHourUseCase {
  constructor(private readonly repo: CompanyBusinessHourRepository) {}

  findAll(): Promise<CompanyBusinessHour[]> { return this.repo.findAll(); }
  findById(id: string): Promise<CompanyBusinessHour | null> { return this.repo.findById(id); }
  create(data: Partial<CompanyBusinessHour>): Promise<CompanyBusinessHour> { return this.repo.save(data); }
  update(id: string, data: Partial<CompanyBusinessHour>): Promise<CompanyBusinessHour> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
