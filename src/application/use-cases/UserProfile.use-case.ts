import { UserProfile } from '../../domain/entities/UserProfile.entity';
import { UserProfileRepository } from '../../domain/repositories/UserProfile.repository';

export class UserProfileUseCase {
  constructor(private readonly repo: UserProfileRepository) {}

  findAll(): Promise<UserProfile[]> { return this.repo.findAll(); }
  findById(id: string): Promise<UserProfile | null> { return this.repo.findById(id); }
  create(data: Partial<UserProfile>): Promise<UserProfile> { return this.repo.save(data); }
  update(id: string, data: Partial<UserProfile>): Promise<UserProfile> {
    return this.repo.save({ ...data, id: id });
  }
  softDelete(id: string): Promise<void> { return this.repo.softDelete(id); }
}
