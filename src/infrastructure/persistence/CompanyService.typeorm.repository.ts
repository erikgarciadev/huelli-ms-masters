import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CompanyService } from '../../domain/entities/CompanyService.entity';
import { CompanyServiceRepository } from '../../domain/repositories/CompanyService.repository';

@Injectable()
export class CompanyServiceTypeOrmRepository implements CompanyServiceRepository {
  constructor(
    @InjectRepository(CompanyService)
    private readonly repo: Repository<CompanyService>,
  ) {}

  findAll(): Promise<CompanyService[]> { return this.repo.find({ where: { is_active: true } as any }); }
  findById(id: string): Promise<CompanyService | null> {
    return this.repo.findOne({ where: { id: id, is_active: true } as any });
  }
  save(entity: Partial<CompanyService>): Promise<CompanyService> { return this.repo.save(entity as CompanyService); }

  async setActive(id: string, isActive: boolean): Promise<CompanyService | null> {
    await this.repo.update(id, { is_active: isActive, updated_at: new Date() } as any);
    return this.repo.findOne({ where: { id: id } as any });
  }
}
