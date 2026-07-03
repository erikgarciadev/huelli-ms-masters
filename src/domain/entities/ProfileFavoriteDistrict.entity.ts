import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'profile_favorite_districts' })
export class ProfileFavoriteDistrict {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_profile_id', type: 'uuid' })
  user_profile_id!: string;

  @Column({ name: 'district_id', type: 'uuid' })
  district_id!: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

}
