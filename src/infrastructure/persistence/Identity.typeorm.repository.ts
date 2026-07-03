import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Identity } from '../../domain/entities/Identity.entity';
import { IdentityRepository } from '../../domain/repositories/Identity.repository';

@Injectable()
export class IdentityTypeOrmRepository implements IdentityRepository {
  constructor(
    @InjectRepository(Identity)
    private readonly repo: Repository<Identity>,
  ) {}

  findAll(): Promise<Identity[]> { return this.repo.find({ where: { deleted_at: IsNull() } as any }); }
  findById(id: string): Promise<Identity | null> {
    return this.repo.findOne({ where: { id: id, deleted_at: IsNull() } as any });
  }
  save(entity: Partial<Identity>): Promise<Identity> { return this.repo.save(entity as Identity); }

  async softDelete(id: string): Promise<void> {
    await this.repo.update(id, { deleted_at: new Date() } as any);
  }
}
