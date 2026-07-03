import { ApiToken } from '../entities/ApiToken.entity';

export interface ApiTokenRepository {
  findAll(): Promise<ApiToken[]>;
  findById(id: string): Promise<ApiToken | null>;
  save(entity: Partial<ApiToken>): Promise<ApiToken>;
  delete(id: string): Promise<void>;
}
