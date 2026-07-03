import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ShelterProfile } from '../../domain/entities/ShelterProfile.entity';
import { ShelterProfileRepository } from '../../domain/repositories/ShelterProfile.repository';

@Injectable()
export class ShelterProfileTypeOrmRepository implements ShelterProfileRepository {
  constructor(
    @InjectRepository(ShelterProfile)
    private readonly repo: Repository<ShelterProfile>,
  ) {}

  findAll(): Promise<ShelterProfile[]> { return this.repo.find(); }
  findById(id: string): Promise<ShelterProfile | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<ShelterProfile>): Promise<ShelterProfile> { return this.repo.save(entity as ShelterProfile); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
