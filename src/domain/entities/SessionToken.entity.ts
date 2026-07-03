import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'session_tokens' })
export class SessionToken {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  user_id!: string;

  @Column({ name: 'session_id', type: 'uuid', default: () => 'gen_random_uuid()' })
  session_id!: string;

  @Column({ name: 'refresh_token_id', type: 'uuid', nullable: true })
  refresh_token_id?: string;

  @Column({ name: 'ip_address', type: 'inet', nullable: true })
  ip_address?: string;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  user_agent?: string;

  @Column({ name: 'started_at', type: 'timestamp', default: () => 'now()' })
  started_at!: Date;

  @Column({ name: 'expires_at', type: 'timestamp', nullable: true })
  expires_at?: Date;

  @Column({ name: 'closed_at', type: 'timestamp', nullable: true })
  closed_at?: Date;

}
