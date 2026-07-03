import { Department } from '../../domain/entities/Department.entity';
import { DepartmentRepository } from '../../domain/repositories/Department.repository';

export class DepartmentUseCase {
  constructor(private readonly repo: DepartmentRepository) {}

  findAll(): Promise<Department[]> { return this.repo.findAll(); }
  findById(id: string): Promise<Department | null> { return this.repo.findById(id); }
  create(data: Partial<Department>): Promise<Department> { return this.repo.save(data); }
  update(id: string, data: Partial<Department>): Promise<Department> {
    return this.repo.save({ ...data, id: id });
  }
  setActive(id: string, isActive: boolean): Promise<Department | null> { return this.repo.setActive(id, isActive); }
}
