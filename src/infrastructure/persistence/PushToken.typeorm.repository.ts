import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { PushToken } from '../../domain/entities/PushToken.entity';
import { PushTokenRepository } from '../../domain/repositories/PushToken.repository';

@Injectable()
export class PushTokenTypeOrmRepository implements PushTokenRepository {
  constructor(
    @InjectRepository(PushToken)
    private readonly repo: Repository<PushToken>,
  ) {}

  findAll(): Promise<PushToken[]> { return this.repo.find({ where: { is_active: true } as any }); }
  findById(id: string): Promise<PushToken | null> {
    return this.repo.findOne({ where: { id: id, is_active: true } as any });
  }
  save(entity: Partial<PushToken>): Promise<PushToken> { return this.repo.save(entity as PushToken); }

  async setActive(id: string, isActive: boolean): Promise<PushToken | null> {
    await this.repo.update(id, { is_active: isActive, updated_at: new Date() } as any);
    return this.repo.findOne({ where: { id: id } as any });
  }
}
