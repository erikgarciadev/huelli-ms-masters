import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ProfilePhone } from '../../domain/entities/ProfilePhone.entity';
import { ProfilePhoneRepository } from '../../domain/repositories/ProfilePhone.repository';

@Injectable()
export class ProfilePhoneTypeOrmRepository implements ProfilePhoneRepository {
  constructor(
    @InjectRepository(ProfilePhone)
    private readonly repo: Repository<ProfilePhone>,
  ) {}

  findAll(): Promise<ProfilePhone[]> { return this.repo.find(); }
  findById(id: string): Promise<ProfilePhone | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<ProfilePhone>): Promise<ProfilePhone> { return this.repo.save(entity as ProfilePhone); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
