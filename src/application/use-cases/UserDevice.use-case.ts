import { UserDevice } from '../../domain/entities/UserDevice.entity';
import { UserDeviceRepository } from '../../domain/repositories/UserDevice.repository';

export class UserDeviceUseCase {
  constructor(private readonly repo: UserDeviceRepository) {}

  findAll(): Promise<UserDevice[]> { return this.repo.findAll(); }
  findById(id: string): Promise<UserDevice | null> { return this.repo.findById(id); }
  create(data: Partial<UserDevice>): Promise<UserDevice> { return this.repo.save(data); }
  update(id: string, data: Partial<UserDevice>): Promise<UserDevice> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
