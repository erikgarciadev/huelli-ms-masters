import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { UserDevice } from '../../domain/entities/UserDevice.entity';
import { UserDeviceRepository } from '../../domain/repositories/UserDevice.repository';

@Injectable()
export class UserDeviceTypeOrmRepository implements UserDeviceRepository {
  constructor(
    @InjectRepository(UserDevice)
    private readonly repo: Repository<UserDevice>,
  ) {}

  findAll(): Promise<UserDevice[]> { return this.repo.find(); }
  findById(id: string): Promise<UserDevice | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<UserDevice>): Promise<UserDevice> { return this.repo.save(entity as UserDevice); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
