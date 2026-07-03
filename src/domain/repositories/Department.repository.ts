import { Department } from '../entities/Department.entity';

export interface DepartmentRepository {
  findAll(): Promise<Department[]>;
  findById(id: string): Promise<Department | null>;
  save(entity: Partial<Department>): Promise<Department>;
  setActive(id: string, isActive: boolean): Promise<Department | null>;
}
