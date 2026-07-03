import { RefreshToken } from '../entities/RefreshToken.entity';

export interface RefreshTokenRepository {
  findAll(): Promise<RefreshToken[]>;
  findById(id: string): Promise<RefreshToken | null>;
  save(entity: Partial<RefreshToken>): Promise<RefreshToken>;
  delete(id: string): Promise<void>;
}
