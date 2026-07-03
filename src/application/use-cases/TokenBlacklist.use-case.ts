import { TokenBlacklist } from '../../domain/entities/TokenBlacklist.entity';
import { TokenBlacklistRepository } from '../../domain/repositories/TokenBlacklist.repository';

export class TokenBlacklistUseCase {
  constructor(private readonly repo: TokenBlacklistRepository) {}

  findAll(): Promise<TokenBlacklist[]> { return this.repo.findAll(); }
  findById(id: string): Promise<TokenBlacklist | null> { return this.repo.findById(id); }
  create(data: Partial<TokenBlacklist>): Promise<TokenBlacklist> { return this.repo.save(data); }
  update(id: string, data: Partial<TokenBlacklist>): Promise<TokenBlacklist> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
