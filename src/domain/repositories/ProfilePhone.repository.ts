import { ProfilePhone } from '../entities/ProfilePhone.entity';

export interface ProfilePhoneRepository {
  findAll(): Promise<ProfilePhone[]>;
  findById(id: string): Promise<ProfilePhone | null>;
  save(entity: Partial<ProfilePhone>): Promise<ProfilePhone>;
  delete(id: string): Promise<void>;
}
