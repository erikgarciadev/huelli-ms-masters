import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ApiToken } from '../../domain/entities/ApiToken.entity';
import { ApiTokenRepository } from '../../domain/repositories/ApiToken.repository';

@Injectable()
export class ApiTokenTypeOrmRepository implements ApiTokenRepository {
  constructor(
    @InjectRepository(ApiToken)
    private readonly repo: Repository<ApiToken>,
  ) {}

  findAll(): Promise<ApiToken[]> { return this.repo.find(); }
  findById(id: string): Promise<ApiToken | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<ApiToken>): Promise<ApiToken> { return this.repo.save(entity as ApiToken); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
