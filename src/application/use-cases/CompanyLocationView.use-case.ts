import { CompanyLocationView } from '../../domain/entities/CompanyLocationView.entity';
import { CompanyLocationViewRepository } from '../../domain/repositories/CompanyLocationView.repository';

export class CompanyLocationViewUseCase {
  constructor(private readonly repo: CompanyLocationViewRepository) {}

  findAll(): Promise<CompanyLocationView[]> { return this.repo.findAll(); }
  findById(id: string): Promise<CompanyLocationView | null> { return this.repo.findById(id); }
}
