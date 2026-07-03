import { VerificationToken } from '../../domain/entities/VerificationToken.entity';
import { VerificationTokenRepository } from '../../domain/repositories/VerificationToken.repository';

export class VerificationTokenUseCase {
  constructor(private readonly repo: VerificationTokenRepository) {}

  findAll(): Promise<VerificationToken[]> { return this.repo.findAll(); }
  findById(id: string): Promise<VerificationToken | null> { return this.repo.findById(id); }
  create(data: Partial<VerificationToken>): Promise<VerificationToken> { return this.repo.save(data); }
  update(id: string, data: Partial<VerificationToken>): Promise<VerificationToken> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
