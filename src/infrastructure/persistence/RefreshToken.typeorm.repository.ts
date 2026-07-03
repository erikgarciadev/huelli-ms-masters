import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { RefreshToken } from '../../domain/entities/RefreshToken.entity';
import { RefreshTokenRepository } from '../../domain/repositories/RefreshToken.repository';

@Injectable()
export class RefreshTokenTypeOrmRepository implements RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly repo: Repository<RefreshToken>,
  ) {}

  findAll(): Promise<RefreshToken[]> { return this.repo.find(); }
  findById(id: string): Promise<RefreshToken | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<RefreshToken>): Promise<RefreshToken> { return this.repo.save(entity as RefreshToken); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
