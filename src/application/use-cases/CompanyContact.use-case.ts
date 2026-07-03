import { CompanyContact } from '../../domain/entities/CompanyContact.entity';
import { CompanyContactRepository } from '../../domain/repositories/CompanyContact.repository';

export class CompanyContactUseCase {
  constructor(private readonly repo: CompanyContactRepository) {}

  findAll(): Promise<CompanyContact[]> { return this.repo.findAll(); }
  findById(id: string): Promise<CompanyContact | null> { return this.repo.findById(id); }
  create(data: Partial<CompanyContact>): Promise<CompanyContact> { return this.repo.save(data); }
  update(id: string, data: Partial<CompanyContact>): Promise<CompanyContact> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
