import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CompanyBusinessHour } from '../../domain/entities/CompanyBusinessHour.entity';
import { CompanyBusinessHourRepository } from '../../domain/repositories/CompanyBusinessHour.repository';

@Injectable()
export class CompanyBusinessHourTypeOrmRepository implements CompanyBusinessHourRepository {
  constructor(
    @InjectRepository(CompanyBusinessHour)
    private readonly repo: Repository<CompanyBusinessHour>,
  ) {}

  findAll(): Promise<CompanyBusinessHour[]> { return this.repo.find(); }
  findById(id: string): Promise<CompanyBusinessHour | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<CompanyBusinessHour>): Promise<CompanyBusinessHour> { return this.repo.save(entity as CompanyBusinessHour); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
