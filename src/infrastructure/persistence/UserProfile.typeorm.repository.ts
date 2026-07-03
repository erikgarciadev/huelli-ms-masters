import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { UserProfile } from '../../domain/entities/UserProfile.entity';
import { UserProfileRepository } from '../../domain/repositories/UserProfile.repository';

@Injectable()
export class UserProfileTypeOrmRepository implements UserProfileRepository {
  constructor(
    @InjectRepository(UserProfile)
    private readonly repo: Repository<UserProfile>,
  ) {}

  findAll(): Promise<UserProfile[]> { return this.repo.find({ where: { deleted_at: IsNull() } as any }); }
  findById(id: string): Promise<UserProfile | null> {
    return this.repo.findOne({ where: { id: id, deleted_at: IsNull() } as any });
  }
  save(entity: Partial<UserProfile>): Promise<UserProfile> { return this.repo.save(entity as UserProfile); }

  async softDelete(id: string): Promise<void> {
    await this.repo.update(id, { deleted_at: new Date() } as any);
  }
}
