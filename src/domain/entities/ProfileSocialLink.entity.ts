import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'profile_social_links' })
export class ProfileSocialLink {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_profile_id', type: 'uuid' })
  user_profile_id!: string;

  @Column({ name: 'social_network', type: 'varchar', length: 50 })
  social_network!: string;

  @Column({ name: 'profile_url', type: 'text' })
  profile_url!: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

}
