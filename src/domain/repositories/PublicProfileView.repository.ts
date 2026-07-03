import { PublicProfileView } from '../entities/PublicProfileView.entity';

export interface PublicProfileViewRepository {
  findAll(): Promise<PublicProfileView[]>;
  findById(id: string): Promise<PublicProfileView | null>;
}
