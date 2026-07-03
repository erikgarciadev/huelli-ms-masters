import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'identities' })
export class Identity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  user_id!: string;

  @Column({ name: 'provider_id', type: 'uuid' })
  provider_id!: string;

  @Column({ name: 'provider_user_id', type: 'varchar', length: 255, nullable: true })
  provider_user_id?: string;

  @Column({ name: 'login_identifier', type: 'text', nullable: true })
  login_identifier?: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255, nullable: true })
  password_hash?: string;

  @Column({ name: 'is_primary', type: 'boolean', default: false })
  is_primary!: boolean;

  @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
  last_login_at?: Date;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updated_at!: Date;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deleted_at?: Date;

}
