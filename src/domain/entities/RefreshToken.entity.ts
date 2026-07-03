import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'refresh_tokens' })
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  user_id!: string;

  @Column({ name: 'token_hash', type: 'text' })
  token_hash!: string;

  @Column({ name: 'expires_at', type: 'timestamp' })
  expires_at!: Date;

  @Column({ name: 'revoked_at', type: 'timestamp', nullable: true })
  revoked_at?: Date;

  @Column({ name: 'ip_address', type: 'inet', nullable: true })
  ip_address?: string;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  user_agent?: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

}
