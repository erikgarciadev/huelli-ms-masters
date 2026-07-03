import { VerificationStatus } from '../../domain/entities/VerificationStatus.entity';
import { VerificationStatusRepository } from '../../domain/repositories/VerificationStatus.repository';

export class VerificationStatusUseCase {
  constructor(private readonly repo: VerificationStatusRepository) {}

  findAll(): Promise<VerificationStatus[]> { return this.repo.findAll(); }
  findById(id: string): Promise<VerificationStatus | null> { return this.repo.findById(id); }
  create(data: Partial<VerificationStatus>): Promise<VerificationStatus> { return this.repo.save(data); }
  update(id: string, data: Partial<VerificationStatus>): Promise<VerificationStatus> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
