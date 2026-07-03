import { ProfilePreference } from '../../domain/entities/ProfilePreference.entity';
import { ProfilePreferenceRepository } from '../../domain/repositories/ProfilePreference.repository';

export class ProfilePreferenceUseCase {
  constructor(private readonly repo: ProfilePreferenceRepository) {}

  findAll(): Promise<ProfilePreference[]> { return this.repo.findAll(); }
  findById(id: string): Promise<ProfilePreference | null> { return this.repo.findById(id); }
  create(data: Partial<ProfilePreference>): Promise<ProfilePreference> { return this.repo.save(data); }
  update(id: string, data: Partial<ProfilePreference>): Promise<ProfilePreference> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
