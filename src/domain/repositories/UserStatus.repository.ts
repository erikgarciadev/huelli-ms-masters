import { UserStatus } from '../entities/UserStatus.entity';

export interface UserStatusRepository {
  findAll(): Promise<UserStatus[]>;
  findById(id: string): Promise<UserStatus | null>;
  save(entity: Partial<UserStatus>): Promise<UserStatus>;
  delete(id: string): Promise<void>;
}
