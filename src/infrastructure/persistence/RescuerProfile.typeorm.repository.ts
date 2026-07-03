import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { RescuerProfile } from '../../domain/entities/RescuerProfile.entity';
import { RescuerProfileRepository } from '../../domain/repositories/RescuerProfile.repository';

@Injectable()
export class RescuerProfileTypeOrmRepository implements RescuerProfileRepository {
  constructor(
    @InjectRepository(RescuerProfile)
    private readonly repo: Repository<RescuerProfile>,
  ) {}

  findAll(): Promise<RescuerProfile[]> { return this.repo.find(); }
  findById(id: string): Promise<RescuerProfile | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<RescuerProfile>): Promise<RescuerProfile> { return this.repo.save(entity as RescuerProfile); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
