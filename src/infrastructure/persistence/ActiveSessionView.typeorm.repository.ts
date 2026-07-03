import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ActiveSessionView } from '../../domain/entities/ActiveSessionView.entity';
import { ActiveSessionViewRepository } from '../../domain/repositories/ActiveSessionView.repository';

@Injectable()
export class ActiveSessionViewTypeOrmRepository implements ActiveSessionViewRepository {
  constructor(
    @InjectRepository(ActiveSessionView)
    private readonly repo: Repository<ActiveSessionView>,
  ) {}

  findAll(): Promise<ActiveSessionView[]> { return this.repo.find(); }
  findById(id: string): Promise<ActiveSessionView | null> {
    return this.repo.findOne({ where: { session_id: id } as any });
  }
}
