import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'login_audit' })
export class LoginAudit {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  user_id?: string;

  @Column({ name: 'provider_id', type: 'uuid', nullable: true })
  provider_id?: string;

  @Column({ name: 'login_identifier', type: 'varchar', length: 255, nullable: true })
  login_identifier?: string;

  @Column({ name: 'success', type: 'boolean' })
  success!: boolean;

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

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

}
