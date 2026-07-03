import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { RescuerView } from '../../domain/entities/RescuerView.entity';
import { RescuerViewRepository } from '../../domain/repositories/RescuerView.repository';

@Injectable()
export class RescuerViewTypeOrmRepository implements RescuerViewRepository {
  constructor(
    @InjectRepository(RescuerView)
    private readonly repo: Repository<RescuerView>,
  ) {}

  findAll(): Promise<RescuerView[]> { return this.repo.find(); }
  findById(id: string): Promise<RescuerView | null> {
    return this.repo.findOne({ where: { rescuer_profile_id: id } as any });
  }
}
