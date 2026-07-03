import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { PasswordResetToken } from '../../domain/entities/PasswordResetToken.entity';
import { PasswordResetTokenRepository } from '../../domain/repositories/PasswordResetToken.repository';

@Injectable()
export class PasswordResetTokenTypeOrmRepository implements PasswordResetTokenRepository {
  constructor(
    @InjectRepository(PasswordResetToken)
    private readonly repo: Repository<PasswordResetToken>,
  ) {}

  findAll(): Promise<PasswordResetToken[]> { return this.repo.find(); }
  findById(id: string): Promise<PasswordResetToken | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<PasswordResetToken>): Promise<PasswordResetToken> { return this.repo.save(entity as PasswordResetToken); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
