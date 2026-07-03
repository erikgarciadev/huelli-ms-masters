import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'vw_active_sessions' })
export class ActiveSessionView {
  @PrimaryColumn({ name: 'session_id', type: 'uuid' })
  session_id!: string;

  @Column({ name: 'primary_email', type: 'text', nullable: true })
  primary_email?: string;

  @Column({ name: 'ip_address', type: 'inet', nullable: true })
  ip_address?: string;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  user_agent?: string;

  @Column({ name: 'started_at', type: 'timestamp', nullable: true })
  started_at?: Date;

  @Column({ name: 'expires_at', type: 'timestamp', nullable: true })
  expires_at?: Date;

}
