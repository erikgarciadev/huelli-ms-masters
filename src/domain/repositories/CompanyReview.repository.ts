import { CompanyReview } from '../entities/CompanyReview.entity';

export interface CompanyReviewRepository {
  findAll(): Promise<CompanyReview[]>;
  findById(id: string): Promise<CompanyReview | null>;
  save(entity: Partial<CompanyReview>): Promise<CompanyReview>;
  delete(id: string): Promise<void>;
}
