import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { UserStatus } from '../../domain/entities/UserStatus.entity';
import { UserStatusRepository } from '../../domain/repositories/UserStatus.repository';

@Injectable()
export class UserStatusTypeOrmRepository implements UserStatusRepository {
  constructor(
    @InjectRepository(UserStatus)
    private readonly repo: Repository<UserStatus>,
  ) {}

  findAll(): Promise<UserStatus[]> { return this.repo.find(); }
  findById(id: string): Promise<UserStatus | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<UserStatus>): Promise<UserStatus> { return this.repo.save(entity as UserStatus); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
