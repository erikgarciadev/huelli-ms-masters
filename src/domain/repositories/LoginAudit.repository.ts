import { LoginAudit } from '../entities/LoginAudit.entity';

export interface LoginAuditRepository {
  findAll(): Promise<LoginAudit[]>;
  findById(id: string): Promise<LoginAudit | null>;
  save(entity: Partial<LoginAudit>): Promise<LoginAudit>;
  delete(id: string): Promise<void>;
}
