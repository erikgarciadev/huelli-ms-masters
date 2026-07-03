import { PasswordResetToken } from '../../domain/entities/PasswordResetToken.entity';
import { PasswordResetTokenRepository } from '../../domain/repositories/PasswordResetToken.repository';

export class PasswordResetTokenUseCase {
  constructor(private readonly repo: PasswordResetTokenRepository) {}

  findAll(): Promise<PasswordResetToken[]> { return this.repo.findAll(); }
  findById(id: string): Promise<PasswordResetToken | null> { return this.repo.findById(id); }
  create(data: Partial<PasswordResetToken>): Promise<PasswordResetToken> { return this.repo.save(data); }
  update(id: string, data: Partial<PasswordResetToken>): Promise<PasswordResetToken> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
