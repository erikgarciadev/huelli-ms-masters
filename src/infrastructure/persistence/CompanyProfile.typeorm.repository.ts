import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CompanyProfile } from '../../domain/entities/CompanyProfile.entity';
import { CompanyProfileRepository } from '../../domain/repositories/CompanyProfile.repository';

@Injectable()
export class CompanyProfileTypeOrmRepository implements CompanyProfileRepository {
  constructor(
    @InjectRepository(CompanyProfile)
    private readonly repo: Repository<CompanyProfile>,
  ) {}

  findAll(): Promise<CompanyProfile[]> { return this.repo.find({ where: { deleted_at: IsNull() } as any }); }
  findById(id: string): Promise<CompanyProfile | null> {
    return this.repo.findOne({ where: { id: id, deleted_at: IsNull() } as any });
  }
  save(entity: Partial<CompanyProfile>): Promise<CompanyProfile> { return this.repo.save(entity as CompanyProfile); }

  async softDelete(id: string): Promise<void> {
    await this.repo.update(id, { deleted_at: new Date() } as any);
  }
}
