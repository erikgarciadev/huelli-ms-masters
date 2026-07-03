import { CompanyCategory } from '../../domain/entities/CompanyCategory.entity';
import { CompanyCategoryRepository } from '../../domain/repositories/CompanyCategory.repository';

export class CompanyCategoryUseCase {
  constructor(private readonly repo: CompanyCategoryRepository) {}

  findAll(): Promise<CompanyCategory[]> { return this.repo.findAll(); }
  findById(id: string): Promise<CompanyCategory | null> { return this.repo.findById(id); }
  create(data: Partial<CompanyCategory>): Promise<CompanyCategory> { return this.repo.save(data); }
  update(id: string, data: Partial<CompanyCategory>): Promise<CompanyCategory> {
    return this.repo.save({ ...data, id: id });
  }
  setActive(id: string, isActive: boolean): Promise<CompanyCategory | null> { return this.repo.setActive(id, isActive); }
}
