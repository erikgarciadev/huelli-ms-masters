import { PasswordResetToken } from '../entities/PasswordResetToken.entity';

export interface PasswordResetTokenRepository {
  findAll(): Promise<PasswordResetToken[]>;
  findById(id: string): Promise<PasswordResetToken | null>;
  save(entity: Partial<PasswordResetToken>): Promise<PasswordResetToken>;
  delete(id: string): Promise<void>;
}
