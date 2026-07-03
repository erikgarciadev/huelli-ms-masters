import { ActiveSessionView } from '../entities/ActiveSessionView.entity';

export interface ActiveSessionViewRepository {
  findAll(): Promise<ActiveSessionView[]>;
  findById(id: string): Promise<ActiveSessionView | null>;
}
