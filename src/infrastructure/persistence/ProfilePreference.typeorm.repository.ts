import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ProfilePreference } from '../../domain/entities/ProfilePreference.entity';
import { ProfilePreferenceRepository } from '../../domain/repositories/ProfilePreference.repository';

@Injectable()
export class ProfilePreferenceTypeOrmRepository implements ProfilePreferenceRepository {
  constructor(
    @InjectRepository(ProfilePreference)
    private readonly repo: Repository<ProfilePreference>,
  ) {}

  findAll(): Promise<ProfilePreference[]> { return this.repo.find(); }
  findById(id: string): Promise<ProfilePreference | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<ProfilePreference>): Promise<ProfilePreference> { return this.repo.save(entity as ProfilePreference); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
