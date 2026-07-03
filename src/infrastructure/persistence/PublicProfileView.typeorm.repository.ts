import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { PublicProfileView } from '../../domain/entities/PublicProfileView.entity';
import { PublicProfileViewRepository } from '../../domain/repositories/PublicProfileView.repository';

@Injectable()
export class PublicProfileViewTypeOrmRepository implements PublicProfileViewRepository {
  constructor(
    @InjectRepository(PublicProfileView)
    private readonly repo: Repository<PublicProfileView>,
  ) {}

  findAll(): Promise<PublicProfileView[]> { return this.repo.find(); }
  findById(id: string): Promise<PublicProfileView | null> {
    return this.repo.findOne({ where: { user_id: id } as any });
  }
}
