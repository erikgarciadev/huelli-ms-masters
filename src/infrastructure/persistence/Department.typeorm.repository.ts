import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Department } from '../../domain/entities/Department.entity';
import { DepartmentRepository } from '../../domain/repositories/Department.repository';

@Injectable()
export class DepartmentTypeOrmRepository implements DepartmentRepository {
  constructor(
    @InjectRepository(Department)
    private readonly repo: Repository<Department>,
  ) {}

  findAll(): Promise<Department[]> { return this.repo.find({ where: { is_active: true } as any }); }
  findById(id: string): Promise<Department | null> {
    return this.repo.findOne({ where: { id: id, is_active: true } as any });
  }
  save(entity: Partial<Department>): Promise<Department> { return this.repo.save(entity as Department); }

  async setActive(id: string, isActive: boolean): Promise<Department | null> {
    await this.repo.update(id, { is_active: isActive, updated_at: new Date() } as any);
    return this.repo.findOne({ where: { id: id } as any });
  }
}
