import { LoginAuditView } from '../entities/LoginAuditView.entity';

export interface LoginAuditViewRepository {
  findAll(): Promise<LoginAuditView[]>;
  findById(id: string): Promise<LoginAuditView | null>;
}
