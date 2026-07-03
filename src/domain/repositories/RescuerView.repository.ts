import { RescuerView } from '../entities/RescuerView.entity';

export interface RescuerViewRepository {
  findAll(): Promise<RescuerView[]>;
  findById(id: string): Promise<RescuerView | null>;
}
