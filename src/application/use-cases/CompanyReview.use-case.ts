import { CompanyReview } from '../../domain/entities/CompanyReview.entity';
import { CompanyReviewRepository } from '../../domain/repositories/CompanyReview.repository';

export class CompanyReviewUseCase {
  constructor(private readonly repo: CompanyReviewRepository) {}

  findAll(): Promise<CompanyReview[]> { return this.repo.findAll(); }
  findById(id: string): Promise<CompanyReview | null> { return this.repo.findById(id); }
  create(data: Partial<CompanyReview>): Promise<CompanyReview> { return this.repo.save(data); }
  update(id: string, data: Partial<CompanyReview>): Promise<CompanyReview> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
