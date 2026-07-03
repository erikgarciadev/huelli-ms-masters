import { ProfileFollower } from '../../domain/entities/ProfileFollower.entity';
import { ProfileFollowerRepository } from '../../domain/repositories/ProfileFollower.repository';

export class ProfileFollowerUseCase {
  constructor(private readonly repo: ProfileFollowerRepository) {}

  findAll(): Promise<ProfileFollower[]> { return this.repo.findAll(); }
  findById(id: string): Promise<ProfileFollower | null> { return this.repo.findById(id); }
  create(data: Partial<ProfileFollower>): Promise<ProfileFollower> { return this.repo.save(data); }
  update(id: string, data: Partial<ProfileFollower>): Promise<ProfileFollower> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
