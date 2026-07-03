import { ProfileFollower } from '../entities/ProfileFollower.entity';

export interface ProfileFollowerRepository {
  findAll(): Promise<ProfileFollower[]>;
  findById(id: string): Promise<ProfileFollower | null>;
  save(entity: Partial<ProfileFollower>): Promise<ProfileFollower>;
  delete(id: string): Promise<void>;
}
