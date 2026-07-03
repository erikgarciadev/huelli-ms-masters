import { RescuerView } from '../../domain/entities/RescuerView.entity';
import { RescuerViewRepository } from '../../domain/repositories/RescuerView.repository';

export class RescuerViewUseCase {
  constructor(private readonly repo: RescuerViewRepository) {}

  findAll(): Promise<RescuerView[]> { return this.repo.findAll(); }
  findById(id: string): Promise<RescuerView | null> { return this.repo.findById(id); }
}
