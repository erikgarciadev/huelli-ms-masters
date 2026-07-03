import { ProfileFavoriteDistrict } from '../entities/ProfileFavoriteDistrict.entity';

export interface ProfileFavoriteDistrictRepository {
  findAll(): Promise<ProfileFavoriteDistrict[]>;
  findById(id: string): Promise<ProfileFavoriteDistrict | null>;
  save(entity: Partial<ProfileFavoriteDistrict>): Promise<ProfileFavoriteDistrict>;
  delete(id: string): Promise<void>;
}
