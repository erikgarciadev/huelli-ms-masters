import { LoginAudit } from '../../domain/entities/LoginAudit.entity';
import { LoginAuditRepository } from '../../domain/repositories/LoginAudit.repository';

export class LoginAuditUseCase {
  constructor(private readonly repo: LoginAuditRepository) {}

  findAll(): Promise<LoginAudit[]> { return this.repo.findAll(); }
  findById(id: string): Promise<LoginAudit | null> { return this.repo.findById(id); }
  create(data: Partial<LoginAudit>): Promise<LoginAudit> { return this.repo.save(data); }
  update(id: string, data: Partial<LoginAudit>): Promise<LoginAudit> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
