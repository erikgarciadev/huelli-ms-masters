import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Country } from '../../domain/entities/Country.entity';
import { CountryRepository } from '../../domain/repositories/Country.repository';

@Injectable()
export class CountryTypeOrmRepository implements CountryRepository {
  constructor(
    @InjectRepository(Country)
    private readonly repo: Repository<Country>,
  ) {}

  findAll(): Promise<Country[]> { return this.repo.find({ where: { is_active: true } as any }); }
  findById(id: string): Promise<Country | null> {
    return this.repo.findOne({ where: { id: id, is_active: true } as any });
  }
  save(entity: Partial<Country>): Promise<Country> { return this.repo.save(entity as Country); }

  async setActive(id: string, isActive: boolean): Promise<Country | null> {
    await this.repo.update(id, { is_active: isActive, updated_at: new Date() } as any);
    return this.repo.findOne({ where: { id: id } as any });
  }
}
