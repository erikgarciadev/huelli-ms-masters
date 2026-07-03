import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'vw_login_audit' })
export class LoginAuditView {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id!: string;

  @Column({ name: 'primary_email', type: 'text', nullable: true })
  primary_email?: string;

  @Column({ name: 'provider', type: 'varchar', length: 30, nullable: true })
  provider?: string;

  @Column({ name: 'login_identifier', type: 'varchar', length: 255, nullable: true })
  login_identifier?: string;

  @Column({ name: 'success', type: 'boolean', nullable: true })
  success?: boolean;

  @Column({ name: 'ip_address', type: 'inet', nullable: true })
  ip_address?: string;

  @Column({ name: 'country', type: 'varchar', length: 100, nullable: true })
  country?: string;

  @Column({ name: 'city', type: 'varchar', length: 100, nullable: true })
  city?: string;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  user_agent?: string;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  error_message?: string;

  @Column({ name: 'created_at', type: 'timestamp', nullable: true })
  created_at?: Date;

}
