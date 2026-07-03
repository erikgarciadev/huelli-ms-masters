import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'verification_tokens' })
export class VerificationToken {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  user_id!: string;

  @Column({ name: 'token', type: 'uuid', default: () => 'gen_random_uuid()' })
  token!: string;

  @Column({ name: 'expires_at', type: 'timestamp' })
  expires_at!: Date;

  @Column({ name: 'used_at', type: 'timestamp', nullable: true })
  used_at?: Date;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

}
