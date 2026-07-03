import { ProfilePhone } from '../../domain/entities/ProfilePhone.entity';
import { ProfilePhoneRepository } from '../../domain/repositories/ProfilePhone.repository';

export class ProfilePhoneUseCase {
  constructor(private readonly repo: ProfilePhoneRepository) {}

  findAll(): Promise<ProfilePhone[]> { return this.repo.findAll(); }
  findById(id: string): Promise<ProfilePhone | null> { return this.repo.findById(id); }
  create(data: Partial<ProfilePhone>): Promise<ProfilePhone> { return this.repo.save(data); }
  update(id: string, data: Partial<ProfilePhone>): Promise<ProfilePhone> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
