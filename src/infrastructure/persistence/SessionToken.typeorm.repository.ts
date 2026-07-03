import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { SessionToken } from '../../domain/entities/SessionToken.entity';
import { SessionTokenRepository } from '../../domain/repositories/SessionToken.repository';

@Injectable()
export class SessionTokenTypeOrmRepository implements SessionTokenRepository {
  constructor(
    @InjectRepository(SessionToken)
    private readonly repo: Repository<SessionToken>,
  ) {}

  findAll(): Promise<SessionToken[]> { return this.repo.find(); }
  findById(id: string): Promise<SessionToken | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<SessionToken>): Promise<SessionToken> { return this.repo.save(entity as SessionToken); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
