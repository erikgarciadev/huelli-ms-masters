import { SessionToken } from '../entities/SessionToken.entity';

export interface SessionTokenRepository {
  findAll(): Promise<SessionToken[]>;
  findById(id: string): Promise<SessionToken | null>;
  save(entity: Partial<SessionToken>): Promise<SessionToken>;
  delete(id: string): Promise<void>;
}
