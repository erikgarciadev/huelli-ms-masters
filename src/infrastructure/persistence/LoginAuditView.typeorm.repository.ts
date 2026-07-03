import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { LoginAuditView } from '../../domain/entities/LoginAuditView.entity';
import { LoginAuditViewRepository } from '../../domain/repositories/LoginAuditView.repository';

@Injectable()
export class LoginAuditViewTypeOrmRepository implements LoginAuditViewRepository {
  constructor(
    @InjectRepository(LoginAuditView)
    private readonly repo: Repository<LoginAuditView>,
  ) {}

  findAll(): Promise<LoginAuditView[]> { return this.repo.find(); }
  findById(id: string): Promise<LoginAuditView | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
}
