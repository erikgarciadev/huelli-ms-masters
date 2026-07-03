import { Role } from '../entities/Role.entity';

export interface RoleRepository {
  findAll(): Promise<Role[]>;
  findById(id: string): Promise<Role | null>;
  save(entity: Partial<Role>): Promise<Role>;
  setActive(id: string, isActive: boolean): Promise<Role | null>;
}
