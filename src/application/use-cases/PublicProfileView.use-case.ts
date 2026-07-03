import { PublicProfileView } from '../../domain/entities/PublicProfileView.entity';
import { PublicProfileViewRepository } from '../../domain/repositories/PublicProfileView.repository';

export class PublicProfileViewUseCase {
  constructor(private readonly repo: PublicProfileViewRepository) {}

  findAll(): Promise<PublicProfileView[]> { return this.repo.findAll(); }
  findById(id: string): Promise<PublicProfileView | null> { return this.repo.findById(id); }
}
