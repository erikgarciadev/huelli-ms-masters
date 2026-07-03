import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'profile_followers' })
export class ProfileFollower {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'follower_profile_id', type: 'uuid' })
  follower_profile_id!: string;

  @Column({ name: 'followed_profile_id', type: 'uuid' })
  followed_profile_id!: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

}
