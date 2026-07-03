import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CompanyLocation } from '../../domain/entities/CompanyLocation.entity';
import { CompanyLocationRepository } from '../../domain/repositories/CompanyLocation.repository';

@Injectable()
export class CompanyLocationTypeOrmRepository implements CompanyLocationRepository {
  constructor(
    @InjectRepository(CompanyLocation)
    private readonly repo: Repository<CompanyLocation>,
  ) {}

  findAll(): Promise<CompanyLocation[]> { return this.repo.find(); }
  findById(id: string): Promise<CompanyLocation | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<CompanyLocation>): Promise<CompanyLocation> { return this.repo.save(entity as CompanyLocation); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
