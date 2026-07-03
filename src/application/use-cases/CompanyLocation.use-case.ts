import { CompanyLocation } from '../../domain/entities/CompanyLocation.entity';
import { CompanyLocationRepository } from '../../domain/repositories/CompanyLocation.repository';

export class CompanyLocationUseCase {
  constructor(private readonly repo: CompanyLocationRepository) {}

  findAll(): Promise<CompanyLocation[]> { return this.repo.findAll(); }
  findById(id: string): Promise<CompanyLocation | null> { return this.repo.findById(id); }
  create(data: Partial<CompanyLocation>): Promise<CompanyLocation> { return this.repo.save(data); }
  update(id: string, data: Partial<CompanyLocation>): Promise<CompanyLocation> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
