import { ProfileSocialLink } from '../entities/ProfileSocialLink.entity';

export interface ProfileSocialLinkRepository {
  findAll(): Promise<ProfileSocialLink[]>;
  findById(id: string): Promise<ProfileSocialLink | null>;
  save(entity: Partial<ProfileSocialLink>): Promise<ProfileSocialLink>;
  delete(id: string): Promise<void>;
}
