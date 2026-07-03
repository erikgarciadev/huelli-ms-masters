import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { LoginAudit } from '../../domain/entities/LoginAudit.entity';
import { LoginAuditRepository } from '../../domain/repositories/LoginAudit.repository';

@Injectable()
export class LoginAuditTypeOrmRepository implements LoginAuditRepository {
  constructor(
    @InjectRepository(LoginAudit)
    private readonly repo: Repository<LoginAudit>,
  ) {}

  findAll(): Promise<LoginAudit[]> { return this.repo.find(); }
  findById(id: string): Promise<LoginAudit | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<LoginAudit>): Promise<LoginAudit> { return this.repo.save(entity as LoginAudit); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
