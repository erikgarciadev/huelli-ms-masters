import { ProfileSocialLink } from '../../domain/entities/ProfileSocialLink.entity';
import { ProfileSocialLinkRepository } from '../../domain/repositories/ProfileSocialLink.repository';

export class ProfileSocialLinkUseCase {
  constructor(private readonly repo: ProfileSocialLinkRepository) {}

  findAll(): Promise<ProfileSocialLink[]> { return this.repo.findAll(); }
  findById(id: string): Promise<ProfileSocialLink | null> { return this.repo.findById(id); }
  create(data: Partial<ProfileSocialLink>): Promise<ProfileSocialLink> { return this.repo.save(data); }
  update(id: string, data: Partial<ProfileSocialLink>): Promise<ProfileSocialLink> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
