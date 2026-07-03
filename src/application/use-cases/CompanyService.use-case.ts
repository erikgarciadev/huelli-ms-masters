import { CompanyService } from '../../domain/entities/CompanyService.entity';
import { CompanyServiceRepository } from '../../domain/repositories/CompanyService.repository';

export class CompanyServiceUseCase {
  constructor(private readonly repo: CompanyServiceRepository) {}

  findAll(): Promise<CompanyService[]> { return this.repo.findAll(); }
  findById(id: string): Promise<CompanyService | null> { return this.repo.findById(id); }
  create(data: Partial<CompanyService>): Promise<CompanyService> { return this.repo.save(data); }
  update(id: string, data: Partial<CompanyService>): Promise<CompanyService> {
    return this.repo.save({ ...data, id: id });
  }
  setActive(id: string, isActive: boolean): Promise<CompanyService | null> { return this.repo.setActive(id, isActive); }
}
