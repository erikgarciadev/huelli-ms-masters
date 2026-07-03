import { ProfileFavoriteDistrict } from '../../domain/entities/ProfileFavoriteDistrict.entity';
import { ProfileFavoriteDistrictRepository } from '../../domain/repositories/ProfileFavoriteDistrict.repository';

export class ProfileFavoriteDistrictUseCase {
  constructor(private readonly repo: ProfileFavoriteDistrictRepository) {}

  findAll(): Promise<ProfileFavoriteDistrict[]> { return this.repo.findAll(); }
  findById(id: string): Promise<ProfileFavoriteDistrict | null> { return this.repo.findById(id); }
  create(data: Partial<ProfileFavoriteDistrict>): Promise<ProfileFavoriteDistrict> { return this.repo.save(data); }
  update(id: string, data: Partial<ProfileFavoriteDistrict>): Promise<ProfileFavoriteDistrict> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
