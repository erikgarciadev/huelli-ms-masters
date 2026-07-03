import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'push_tokens' })
export class PushToken {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_device_id', type: 'uuid' })
  user_device_id!: string;

  @Column({ name: 'provider', type: 'varchar', length: 30 })
  provider!: string;

  @Column({ name: 'token', type: 'text' })
  token!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active!: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updated_at!: Date;

}
