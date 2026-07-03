import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { TokenBlacklist } from '../../domain/entities/TokenBlacklist.entity';
import { TokenBlacklistRepository } from '../../domain/repositories/TokenBlacklist.repository';

@Injectable()
export class TokenBlacklistTypeOrmRepository implements TokenBlacklistRepository {
  constructor(
    @InjectRepository(TokenBlacklist)
    private readonly repo: Repository<TokenBlacklist>,
  ) {}

  findAll(): Promise<TokenBlacklist[]> { return this.repo.find(); }
  findById(id: string): Promise<TokenBlacklist | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<TokenBlacklist>): Promise<TokenBlacklist> { return this.repo.save(entity as TokenBlacklist); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
