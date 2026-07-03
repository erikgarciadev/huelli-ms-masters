import { VerificationStatus } from '../entities/VerificationStatus.entity';

export interface VerificationStatusRepository {
  findAll(): Promise<VerificationStatus[]>;
  findById(id: string): Promise<VerificationStatus | null>;
  save(entity: Partial<VerificationStatus>): Promise<VerificationStatus>;
  delete(id: string): Promise<void>;
}
