import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CompanyCategory } from '../../domain/entities/CompanyCategory.entity';
import { CompanyCategoryRepository } from '../../domain/repositories/CompanyCategory.repository';

@Injectable()
export class CompanyCategoryTypeOrmRepository implements CompanyCategoryRepository {
  constructor(
    @InjectRepository(CompanyCategory)
    private readonly repo: Repository<CompanyCategory>,
  ) {}

  findAll(): Promise<CompanyCategory[]> { return this.repo.find({ where: { is_active: true } as any }); }
  findById(id: string): Promise<CompanyCategory | null> {
    return this.repo.findOne({ where: { id: id, is_active: true } as any });
  }
  save(entity: Partial<CompanyCategory>): Promise<CompanyCategory> { return this.repo.save(entity as CompanyCategory); }

  async setActive(id: string, isActive: boolean): Promise<CompanyCategory | null> {
    await this.repo.update(id, { is_active: isActive, updated_at: new Date() } as any);
    return this.repo.findOne({ where: { id: id } as any });
  }
}
