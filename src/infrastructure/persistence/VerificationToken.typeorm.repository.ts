import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { VerificationToken } from '../../domain/entities/VerificationToken.entity';
import { VerificationTokenRepository } from '../../domain/repositories/VerificationToken.repository';

@Injectable()
export class VerificationTokenTypeOrmRepository implements VerificationTokenRepository {
  constructor(
    @InjectRepository(VerificationToken)
    private readonly repo: Repository<VerificationToken>,
  ) {}

  findAll(): Promise<VerificationToken[]> { return this.repo.find(); }
  findById(id: string): Promise<VerificationToken | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<VerificationToken>): Promise<VerificationToken> { return this.repo.save(entity as VerificationToken); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
