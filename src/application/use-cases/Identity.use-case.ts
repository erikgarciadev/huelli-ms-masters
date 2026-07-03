import { Identity } from '../../domain/entities/Identity.entity';
import { IdentityRepository } from '../../domain/repositories/Identity.repository';

export class IdentityUseCase {
  constructor(private readonly repo: IdentityRepository) {}

  findAll(): Promise<Identity[]> { return this.repo.findAll(); }
  findById(id: string): Promise<Identity | null> { return this.repo.findById(id); }
  create(data: Partial<Identity>): Promise<Identity> { return this.repo.save(data); }
  update(id: string, data: Partial<Identity>): Promise<Identity> {
    return this.repo.save({ ...data, id: id });
  }
  softDelete(id: string): Promise<void> { return this.repo.softDelete(id); }
}
