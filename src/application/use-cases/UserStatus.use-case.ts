import { UserStatus } from '../../domain/entities/UserStatus.entity';
import { UserStatusRepository } from '../../domain/repositories/UserStatus.repository';

export class UserStatusUseCase {
  constructor(private readonly repo: UserStatusRepository) {}

  findAll(): Promise<UserStatus[]> { return this.repo.findAll(); }
  findById(id: string): Promise<UserStatus | null> { return this.repo.findById(id); }
  create(data: Partial<UserStatus>): Promise<UserStatus> { return this.repo.save(data); }
  update(id: string, data: Partial<UserStatus>): Promise<UserStatus> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
