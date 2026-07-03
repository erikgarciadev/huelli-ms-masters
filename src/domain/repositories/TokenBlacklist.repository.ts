import { TokenBlacklist } from '../entities/TokenBlacklist.entity';

export interface TokenBlacklistRepository {
  findAll(): Promise<TokenBlacklist[]>;
  findById(id: string): Promise<TokenBlacklist | null>;
  save(entity: Partial<TokenBlacklist>): Promise<TokenBlacklist>;
  delete(id: string): Promise<void>;
}
