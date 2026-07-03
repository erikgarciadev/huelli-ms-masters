import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { VerificationStatus } from '../../domain/entities/VerificationStatus.entity';
import { VerificationStatusRepository } from '../../domain/repositories/VerificationStatus.repository';

@Injectable()
export class VerificationStatusTypeOrmRepository implements VerificationStatusRepository {
  constructor(
    @InjectRepository(VerificationStatus)
    private readonly repo: Repository<VerificationStatus>,
  ) {}

  findAll(): Promise<VerificationStatus[]> { return this.repo.find(); }
  findById(id: string): Promise<VerificationStatus | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<VerificationStatus>): Promise<VerificationStatus> { return this.repo.save(entity as VerificationStatus); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
