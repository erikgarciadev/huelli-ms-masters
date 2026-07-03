import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'profile_preferences' })
export class ProfilePreference {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_profile_id', type: 'uuid' })
  user_profile_id!: string;

  @Column({ name: 'receive_notifications', type: 'boolean', default: true })
  receive_notifications!: boolean;

  @Column({ name: 'receive_email', type: 'boolean', default: true })
  receive_email!: boolean;

  @Column({ name: 'receive_marketing', type: 'boolean', default: false })
  receive_marketing!: boolean;

  @Column({ name: 'share_location', type: 'boolean', default: true })
  share_location!: boolean;

  @Column({ name: 'dark_mode', type: 'boolean', default: false })
  dark_mode!: boolean;

  @Column({ name: 'language_code', type: 'varchar', length: 10, nullable: true })
  language_code?: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updated_at!: Date;

}
