import { ShelterProfile } from '../entities/ShelterProfile.entity';

export interface ShelterProfileRepository {
  findAll(): Promise<ShelterProfile[]>;
  findById(id: string): Promise<ShelterProfile | null>;
  save(entity: Partial<ShelterProfile>): Promise<ShelterProfile>;
  delete(id: string): Promise<void>;
}
