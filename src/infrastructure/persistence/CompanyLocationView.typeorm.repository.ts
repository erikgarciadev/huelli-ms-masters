import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CompanyLocationView } from '../../domain/entities/CompanyLocationView.entity';
import { CompanyLocationViewRepository } from '../../domain/repositories/CompanyLocationView.repository';

@Injectable()
export class CompanyLocationViewTypeOrmRepository implements CompanyLocationViewRepository {
  constructor(
    @InjectRepository(CompanyLocationView)
    private readonly repo: Repository<CompanyLocationView>,
  ) {}

  findAll(): Promise<CompanyLocationView[]> { return this.repo.find(); }
  findById(id: string): Promise<CompanyLocationView | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
}
