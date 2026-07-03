import { District } from '../../domain/entities/District.entity';
import { DistrictRepository } from '../../domain/repositories/District.repository';

export class DistrictUseCase {
  constructor(private readonly repo: DistrictRepository) {}

  findAll(): Promise<District[]> { return this.repo.findAll(); }
  findById(id: string): Promise<District | null> { return this.repo.findById(id); }
  create(data: Partial<District>): Promise<District> { return this.repo.save(data); }
  update(id: string, data: Partial<District>): Promise<District> {
    return this.repo.save({ ...data, id: id });
  }
  setActive(id: string, isActive: boolean): Promise<District | null> { return this.repo.setActive(id, isActive); }
}
