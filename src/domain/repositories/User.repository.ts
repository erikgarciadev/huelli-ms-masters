import { User } from '../entities/User.entity';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  save(entity: Partial<User>): Promise<User>;
  softDelete(id: string): Promise<void>;
}
