import { ActiveSessionView } from '../../domain/entities/ActiveSessionView.entity';
import { ActiveSessionViewRepository } from '../../domain/repositories/ActiveSessionView.repository';

export class ActiveSessionViewUseCase {
  constructor(private readonly repo: ActiveSessionViewRepository) {}

  findAll(): Promise<ActiveSessionView[]> { return this.repo.findAll(); }
  findById(id: string): Promise<ActiveSessionView | null> { return this.repo.findById(id); }
}
