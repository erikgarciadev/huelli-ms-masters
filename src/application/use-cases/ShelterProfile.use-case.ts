import { ShelterProfile } from '../../domain/entities/ShelterProfile.entity';
import { ShelterProfileRepository } from '../../domain/repositories/ShelterProfile.repository';

export class ShelterProfileUseCase {
  constructor(private readonly repo: ShelterProfileRepository) {}

  findAll(): Promise<ShelterProfile[]> { return this.repo.findAll(); }
  findById(id: string): Promise<ShelterProfile | null> { return this.repo.findById(id); }
  create(data: Partial<ShelterProfile>): Promise<ShelterProfile> { return this.repo.save(data); }
  update(id: string, data: Partial<ShelterProfile>): Promise<ShelterProfile> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
