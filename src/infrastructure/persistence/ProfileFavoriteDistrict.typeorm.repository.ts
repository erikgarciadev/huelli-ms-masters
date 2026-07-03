import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ProfileFavoriteDistrict } from '../../domain/entities/ProfileFavoriteDistrict.entity';
import { ProfileFavoriteDistrictRepository } from '../../domain/repositories/ProfileFavoriteDistrict.repository';

@Injectable()
export class ProfileFavoriteDistrictTypeOrmRepository implements ProfileFavoriteDistrictRepository {
  constructor(
    @InjectRepository(ProfileFavoriteDistrict)
    private readonly repo: Repository<ProfileFavoriteDistrict>,
  ) {}

  findAll(): Promise<ProfileFavoriteDistrict[]> { return this.repo.find(); }
  findById(id: string): Promise<ProfileFavoriteDistrict | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<ProfileFavoriteDistrict>): Promise<ProfileFavoriteDistrict> { return this.repo.save(entity as ProfileFavoriteDistrict); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
