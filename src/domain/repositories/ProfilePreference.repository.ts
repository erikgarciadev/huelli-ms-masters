import { ProfilePreference } from '../entities/ProfilePreference.entity';

export interface ProfilePreferenceRepository {
  findAll(): Promise<ProfilePreference[]>;
  findById(id: string): Promise<ProfilePreference | null>;
  save(entity: Partial<ProfilePreference>): Promise<ProfilePreference>;
  delete(id: string): Promise<void>;
}
