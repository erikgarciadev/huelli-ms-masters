import { ShelterView } from '../../domain/entities/ShelterView.entity';
import { ShelterViewRepository } from '../../domain/repositories/ShelterView.repository';

export class ShelterViewUseCase {
  constructor(private readonly repo: ShelterViewRepository) {}

  findAll(): Promise<ShelterView[]> { return this.repo.findAll(); }
  findById(id: string): Promise<ShelterView | null> { return this.repo.findById(id); }
}
