import { UserDevice } from '../entities/UserDevice.entity';

export interface UserDeviceRepository {
  findAll(): Promise<UserDevice[]>;
  findById(id: string): Promise<UserDevice | null>;
  save(entity: Partial<UserDevice>): Promise<UserDevice>;
  delete(id: string): Promise<void>;
}
