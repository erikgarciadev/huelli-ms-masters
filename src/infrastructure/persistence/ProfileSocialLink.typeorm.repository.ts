import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ProfileSocialLink } from '../../domain/entities/ProfileSocialLink.entity';
import { ProfileSocialLinkRepository } from '../../domain/repositories/ProfileSocialLink.repository';

@Injectable()
export class ProfileSocialLinkTypeOrmRepository implements ProfileSocialLinkRepository {
  constructor(
    @InjectRepository(ProfileSocialLink)
    private readonly repo: Repository<ProfileSocialLink>,
  ) {}

  findAll(): Promise<ProfileSocialLink[]> { return this.repo.find(); }
  findById(id: string): Promise<ProfileSocialLink | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<ProfileSocialLink>): Promise<ProfileSocialLink> { return this.repo.save(entity as ProfileSocialLink); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
