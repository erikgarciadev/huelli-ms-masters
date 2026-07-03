import { RescuerProfile } from '../entities/RescuerProfile.entity';

export interface RescuerProfileRepository {
  findAll(): Promise<RescuerProfile[]>;
  findById(id: string): Promise<RescuerProfile | null>;
  save(entity: Partial<RescuerProfile>): Promise<RescuerProfile>;
  delete(id: string): Promise<void>;
}
