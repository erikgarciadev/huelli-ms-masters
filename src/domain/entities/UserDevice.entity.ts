import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'user_devices' })
export class UserDevice {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  user_id!: string;

  @Column({ name: 'device_name', type: 'varchar', length: 150, nullable: true })
  device_name?: string;

  @Column({ name: 'platform', type: 'varchar', length: 50, nullable: true })
  platform?: string;

  @Column({ name: 'os_version', type: 'varchar', length: 50, nullable: true })
  os_version?: string;

  @Column({ name: 'app_version', type: 'varchar', length: 50, nullable: true })
  app_version?: string;

  @Column({ name: 'device_identifier', type: 'varchar', length: 255, nullable: true })
  device_identifier?: string;

  @Column({ name: 'push_token', type: 'text', nullable: true })
  push_token?: string;

  @Column({ name: 'last_seen_at', type: 'timestamp', nullable: true })
  last_seen_at?: Date;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updated_at!: Date;

}
