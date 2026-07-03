import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CompanyReview } from '../../domain/entities/CompanyReview.entity';
import { CompanyReviewRepository } from '../../domain/repositories/CompanyReview.repository';

@Injectable()
export class CompanyReviewTypeOrmRepository implements CompanyReviewRepository {
  constructor(
    @InjectRepository(CompanyReview)
    private readonly repo: Repository<CompanyReview>,
  ) {}

  findAll(): Promise<CompanyReview[]> { return this.repo.find(); }
  findById(id: string): Promise<CompanyReview | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<CompanyReview>): Promise<CompanyReview> { return this.repo.save(entity as CompanyReview); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
