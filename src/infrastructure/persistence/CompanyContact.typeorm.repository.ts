import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CompanyContact } from '../../domain/entities/CompanyContact.entity';
import { CompanyContactRepository } from '../../domain/repositories/CompanyContact.repository';

@Injectable()
export class CompanyContactTypeOrmRepository implements CompanyContactRepository {
  constructor(
    @InjectRepository(CompanyContact)
    private readonly repo: Repository<CompanyContact>,
  ) {}

  findAll(): Promise<CompanyContact[]> { return this.repo.find(); }
  findById(id: string): Promise<CompanyContact | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<CompanyContact>): Promise<CompanyContact> { return this.repo.save(entity as CompanyContact); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
