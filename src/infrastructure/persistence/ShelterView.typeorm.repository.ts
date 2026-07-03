import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ShelterView } from '../../domain/entities/ShelterView.entity';
import { ShelterViewRepository } from '../../domain/repositories/ShelterView.repository';

@Injectable()
export class ShelterViewTypeOrmRepository implements ShelterViewRepository {
  constructor(
    @InjectRepository(ShelterView)
    private readonly repo: Repository<ShelterView>,
  ) {}

  findAll(): Promise<ShelterView[]> { return this.repo.find(); }
  findById(id: string): Promise<ShelterView | null> {
    return this.repo.findOne({ where: { shelter_profile_id: id } as any });
  }
}
