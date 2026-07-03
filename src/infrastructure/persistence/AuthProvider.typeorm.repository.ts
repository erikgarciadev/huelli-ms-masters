import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { AuthProvider } from '../../domain/entities/AuthProvider.entity';
import { AuthProviderRepository } from '../../domain/repositories/AuthProvider.repository';

@Injectable()
export class AuthProviderTypeOrmRepository implements AuthProviderRepository {
  constructor(
    @InjectRepository(AuthProvider)
    private readonly repo: Repository<AuthProvider>,
  ) {}

  findAll(): Promise<AuthProvider[]> { return this.repo.find({ where: { is_active: true } as any }); }
  findById(id: string): Promise<AuthProvider | null> {
    return this.repo.findOne({ where: { id: id, is_active: true } as any });
  }
  save(entity: Partial<AuthProvider>): Promise<AuthProvider> { return this.repo.save(entity as AuthProvider); }

  async setActive(id: string, isActive: boolean): Promise<AuthProvider | null> {
    await this.repo.update(id, { is_active: isActive } as any);
    return this.repo.findOne({ where: { id: id } as any });
  }
}
