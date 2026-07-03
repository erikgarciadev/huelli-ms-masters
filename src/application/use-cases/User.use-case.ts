import { User } from '../../domain/entities/User.entity';
import { UserRepository } from '../../domain/repositories/User.repository';

export class UserUseCase {
  constructor(private readonly repo: UserRepository) {}

  findAll(): Promise<User[]> { return this.repo.findAll(); }
  findById(id: string): Promise<User | null> { return this.repo.findById(id); }
  create(data: Partial<User>): Promise<User> { return this.repo.save(data); }
  update(id: string, data: Partial<User>): Promise<User> {
    return this.repo.save({ ...data, id: id });
  }
  softDelete(id: string): Promise<void> { return this.repo.softDelete(id); }
}
