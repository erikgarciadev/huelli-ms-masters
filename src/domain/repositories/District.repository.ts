import { District } from '../entities/District.entity';

export interface DistrictRepository {
  findAll(): Promise<District[]>;
  findById(id: string): Promise<District | null>;
  save(entity: Partial<District>): Promise<District>;
  setActive(id: string, isActive: boolean): Promise<District | null>;
}
