import { AuthProvider } from '../../domain/entities/AuthProvider.entity';
import { AuthProviderRepository } from '../../domain/repositories/AuthProvider.repository';

export class AuthProviderUseCase {
  constructor(private readonly repo: AuthProviderRepository) {}

  findAll(): Promise<AuthProvider[]> { return this.repo.findAll(); }
  findById(id: string): Promise<AuthProvider | null> { return this.repo.findById(id); }
  create(data: Partial<AuthProvider>): Promise<AuthProvider> { return this.repo.save(data); }
  update(id: string, data: Partial<AuthProvider>): Promise<AuthProvider> {
    return this.repo.save({ ...data, id: id });
  }
  setActive(id: string, isActive: boolean): Promise<AuthProvider | null> { return this.repo.setActive(id, isActive); }
}
