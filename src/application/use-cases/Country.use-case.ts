import { Country } from '../../domain/entities/Country.entity';
import { CountryRepository } from '../../domain/repositories/Country.repository';

export class CountryUseCase {
  constructor(private readonly repo: CountryRepository) {}

  findAll(): Promise<Country[]> { return this.repo.findAll(); }
  findById(id: string): Promise<Country | null> { return this.repo.findById(id); }
  create(data: Partial<Country>): Promise<Country> { return this.repo.save(data); }
  update(id: string, data: Partial<Country>): Promise<Country> {
    return this.repo.save({ ...data, id: id });
  }
  setActive(id: string, isActive: boolean): Promise<Country | null> { return this.repo.setActive(id, isActive); }
}
