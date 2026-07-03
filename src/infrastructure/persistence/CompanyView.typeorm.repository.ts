import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CompanyView } from '../../domain/entities/CompanyView.entity';
import { CompanyViewRepository } from '../../domain/repositories/CompanyView.repository';

@Injectable()
export class CompanyViewTypeOrmRepository implements CompanyViewRepository {
  constructor(
    @InjectRepository(CompanyView)
    private readonly repo: Repository<CompanyView>,
  ) {}

  findAll(): Promise<CompanyView[]> { return this.repo.find(); }
  findById(id: string): Promise<CompanyView | null> {
    return this.repo.findOne({ where: { company_profile_id: id } as any });
  }
}
