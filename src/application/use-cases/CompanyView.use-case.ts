import { CompanyView } from '../../domain/entities/CompanyView.entity';
import { CompanyViewRepository } from '../../domain/repositories/CompanyView.repository';

export class CompanyViewUseCase {
  constructor(private readonly repo: CompanyViewRepository) {}

  findAll(): Promise<CompanyView[]> { return this.repo.findAll(); }
  findById(id: string): Promise<CompanyView | null> { return this.repo.findById(id); }
}
