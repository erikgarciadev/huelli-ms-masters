import { VerificationToken } from '../entities/VerificationToken.entity';

export interface VerificationTokenRepository {
  findAll(): Promise<VerificationToken[]>;
  findById(id: string): Promise<VerificationToken | null>;
  save(entity: Partial<VerificationToken>): Promise<VerificationToken>;
  delete(id: string): Promise<void>;
}
