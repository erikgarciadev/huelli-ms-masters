import { RescuerProfile } from '../../domain/entities/RescuerProfile.entity';
import { RescuerProfileRepository } from '../../domain/repositories/RescuerProfile.repository';

export class RescuerProfileUseCase {
  constructor(private readonly repo: RescuerProfileRepository) {}

  findAll(): Promise<RescuerProfile[]> { return this.repo.findAll(); }
  findById(id: string): Promise<RescuerProfile | null> { return this.repo.findById(id); }
  create(data: Partial<RescuerProfile>): Promise<RescuerProfile> { return this.repo.save(data); }
  update(id: string, data: Partial<RescuerProfile>): Promise<RescuerProfile> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
