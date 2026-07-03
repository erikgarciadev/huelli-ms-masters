import { LoginAuditView } from '../../domain/entities/LoginAuditView.entity';
import { LoginAuditViewRepository } from '../../domain/repositories/LoginAuditView.repository';

export class LoginAuditViewUseCase {
  constructor(private readonly repo: LoginAuditViewRepository) {}

  findAll(): Promise<LoginAuditView[]> { return this.repo.findAll(); }
  findById(id: string): Promise<LoginAuditView | null> { return this.repo.findById(id); }
}
