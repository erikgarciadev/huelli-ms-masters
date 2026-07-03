import { ShelterView } from '../entities/ShelterView.entity';

export interface ShelterViewRepository {
  findAll(): Promise<ShelterView[]>;
  findById(id: string): Promise<ShelterView | null>;
}
