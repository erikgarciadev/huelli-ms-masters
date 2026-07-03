import { Role } from '../../domain/entities/Role.entity';
import { RoleRepository } from '../../domain/repositories/Role.repository';

export class RoleUseCase {
  constructor(private readonly repo: RoleRepository) {}

  findAll(): Promise<Role[]> { return this.repo.findAll(); }
  findById(id: string): Promise<Role | null> { return this.repo.findById(id); }
  create(data: Partial<Role>): Promise<Role> { return this.repo.save(data); }
  update(id: string, data: Partial<Role>): Promise<Role> {
    return this.repo.save({ ...data, id: id });
  }
  setActive(id: string, isActive: boolean): Promise<Role | null> { return this.repo.setActive(id, isActive); }
}
