import { CompanyProfile } from '../../domain/entities/CompanyProfile.entity';
import { CompanyProfileRepository } from '../../domain/repositories/CompanyProfile.repository';

export class CompanyProfileUseCase {
  constructor(private readonly repo: CompanyProfileRepository) {}

  findAll(): Promise<CompanyProfile[]> { return this.repo.findAll(); }
  findById(id: string): Promise<CompanyProfile | null> { return this.repo.findById(id); }
  create(data: Partial<CompanyProfile>): Promise<CompanyProfile> { return this.repo.save(data); }
  update(id: string, data: Partial<CompanyProfile>): Promise<CompanyProfile> {
    return this.repo.save({ ...data, id: id });
  }
  softDelete(id: string): Promise<void> { return this.repo.softDelete(id); }
}
