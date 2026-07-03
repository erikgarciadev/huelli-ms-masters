import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Role } from '../../domain/entities/Role.entity';
import { RoleRepository } from '../../domain/repositories/Role.repository';

@Injectable()
export class RoleTypeOrmRepository implements RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
  ) {}

  findAll(): Promise<Role[]> { return this.repo.find({ where: { is_active: true } as any }); }
  findById(id: string): Promise<Role | null> {
    return this.repo.findOne({ where: { id: id, is_active: true } as any });
  }
  save(entity: Partial<Role>): Promise<Role> { return this.repo.save(entity as Role); }

  async setActive(id: string, isActive: boolean): Promise<Role | null> {
    await this.repo.update(id, { is_active: isActive, updated_at: new Date() } as any);
    return this.repo.findOne({ where: { id: id } as any });
  }
}
