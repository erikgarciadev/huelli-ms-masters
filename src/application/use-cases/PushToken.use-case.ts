import { PushToken } from '../../domain/entities/PushToken.entity';
import { PushTokenRepository } from '../../domain/repositories/PushToken.repository';

export class PushTokenUseCase {
  constructor(private readonly repo: PushTokenRepository) {}

  findAll(): Promise<PushToken[]> { return this.repo.findAll(); }
  findById(id: string): Promise<PushToken | null> { return this.repo.findById(id); }
  create(data: Partial<PushToken>): Promise<PushToken> { return this.repo.save(data); }
  update(id: string, data: Partial<PushToken>): Promise<PushToken> {
    return this.repo.save({ ...data, id: id });
  }
  setActive(id: string, isActive: boolean): Promise<PushToken | null> { return this.repo.setActive(id, isActive); }
}
