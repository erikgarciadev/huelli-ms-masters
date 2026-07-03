import { UserProfile } from '../entities/UserProfile.entity';

export interface UserProfileRepository {
  findAll(): Promise<UserProfile[]>;
  findById(id: string): Promise<UserProfile | null>;
  save(entity: Partial<UserProfile>): Promise<UserProfile>;
  softDelete(id: string): Promise<void>;
}
