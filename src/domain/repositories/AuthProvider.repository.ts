import { AuthProvider } from '../entities/AuthProvider.entity';

export interface AuthProviderRepository {
  findAll(): Promise<AuthProvider[]>;
  findById(id: string): Promise<AuthProvider | null>;
  save(entity: Partial<AuthProvider>): Promise<AuthProvider>;
  setActive(id: string, isActive: boolean): Promise<AuthProvider | null>;
}
