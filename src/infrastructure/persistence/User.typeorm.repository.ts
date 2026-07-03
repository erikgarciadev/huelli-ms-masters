import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { User } from '../../domain/entities/User.entity';
import { UserRepository } from '../../domain/repositories/User.repository';

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> { return this.repo.find({ where: { deleted_at: IsNull() } as any }); }
  findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id: id, deleted_at: IsNull() } as any });
  }
  save(entity: Partial<User>): Promise<User> { return this.repo.save(entity as User); }

  async softDelete(id: string): Promise<void> {
    await this.repo.update(id, { deleted_at: new Date() } as any);
  }
}
