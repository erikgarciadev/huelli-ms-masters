import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'vw_public_profiles' })
export class PublicProfileView {
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  user_id!: string;

  @Column({ name: 'profile_id', type: 'uuid', nullable: true })
  profile_id?: string;

  @Column({ name: 'community_alias', type: 'text', nullable: true })
  community_alias?: string;

  @Column({ name: 'full_name', type: 'varchar', length: 150, nullable: true })
  full_name?: string;

  @Column({ name: 'profile_photo_url', type: 'text', nullable: true })
  profile_photo_url?: string;

  @Column({ name: 'bio', type: 'text', nullable: true })
  bio?: string;

  @Column({ name: 'reference_url', type: 'text', nullable: true })
  reference_url?: string;

  @Column({ name: 'role_code', type: 'varchar', length: 30, nullable: true })
  role_code?: string;

  @Column({ name: 'role_name', type: 'varchar', length: 100, nullable: true })
  role_name?: string;

  @Column({ name: 'country', type: 'text', nullable: true })
  country?: string;

  @Column({ name: 'department', type: 'text', nullable: true })
  department?: string;

  @Column({ name: 'district', type: 'text', nullable: true })
  district?: string;

  @Column({ name: 'is_public', type: 'boolean', nullable: true })
  is_public?: boolean;

  @Column({ name: 'email_verified', type: 'boolean', nullable: true })
  email_verified?: boolean;

  @Column({ name: 'created_at', type: 'timestamp', nullable: true })
  created_at?: Date;

}
