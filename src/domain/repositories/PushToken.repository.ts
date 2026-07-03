import { PushToken } from '../entities/PushToken.entity';

export interface PushTokenRepository {
  findAll(): Promise<PushToken[]>;
  findById(id: string): Promise<PushToken | null>;
  save(entity: Partial<PushToken>): Promise<PushToken>;
  setActive(id: string, isActive: boolean): Promise<PushToken | null>;
}
