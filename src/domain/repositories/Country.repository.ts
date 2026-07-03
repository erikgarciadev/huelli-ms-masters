import { Country } from '../entities/Country.entity';

export interface CountryRepository {
  findAll(): Promise<Country[]>;
  findById(id: string): Promise<Country | null>;
  save(entity: Partial<Country>): Promise<Country>;
  setActive(id: string, isActive: boolean): Promise<Country | null>;
}
