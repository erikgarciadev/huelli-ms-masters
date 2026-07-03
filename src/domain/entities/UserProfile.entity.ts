import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'user_profiles' })
export class UserProfile {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  user_id!: string;

  @Column({ name: 'community_alias', type: 'text', nullable: true })
  community_alias?: string;

  @Column({ name: 'full_name', type: 'varchar', length: 150 })
  full_name!: string;

  @Column({ name: 'profile_photo_url', type: 'text', nullable: true })
  profile_photo_url?: string;

  @Column({ name: 'bio', type: 'text', nullable: true })
  bio?: string;

  @Column({ name: 'reference_url', type: 'text', nullable: true })
  reference_url?: string;

  @Column({ name: 'country_id', type: 'uuid', nullable: true })
  country_id?: string;

  @Column({ name: 'department_id', type: 'uuid', nullable: true })
  department_id?: string;

  @Column({ name: 'district_id', type: 'uuid', nullable: true })
  district_id?: string;

  @Column({ name: 'is_public', type: 'boolean', default: true })
  is_public!: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updated_at!: Date;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deleted_at?: Date;

}
