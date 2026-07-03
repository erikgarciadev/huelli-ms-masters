import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { District } from '../../domain/entities/District.entity';
import { DistrictRepository } from '../../domain/repositories/District.repository';

@Injectable()
export class DistrictTypeOrmRepository implements DistrictRepository {
  constructor(
    @InjectRepository(District)
    private readonly repo: Repository<District>,
  ) {}

  findAll(): Promise<District[]> { return this.repo.find({ where: { is_active: true } as any }); }
  findById(id: string): Promise<District | null> {
    return this.repo.findOne({ where: { id: id, is_active: true } as any });
  }
  save(entity: Partial<District>): Promise<District> { return this.repo.save(entity as District); }

  async setActive(id: string, isActive: boolean): Promise<District | null> {
    await this.repo.update(id, { is_active: isActive, updated_at: new Date() } as any);
    return this.repo.findOne({ where: { id: id } as any });
  }
}
