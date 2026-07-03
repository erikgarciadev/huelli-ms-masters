import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ProfileFollower } from '../../domain/entities/ProfileFollower.entity';
import { ProfileFollowerRepository } from '../../domain/repositories/ProfileFollower.repository';

@Injectable()
export class ProfileFollowerTypeOrmRepository implements ProfileFollowerRepository {
  constructor(
    @InjectRepository(ProfileFollower)
    private readonly repo: Repository<ProfileFollower>,
  ) {}

  findAll(): Promise<ProfileFollower[]> { return this.repo.find(); }
  findById(id: string): Promise<ProfileFollower | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<ProfileFollower>): Promise<ProfileFollower> { return this.repo.save(entity as ProfileFollower); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
