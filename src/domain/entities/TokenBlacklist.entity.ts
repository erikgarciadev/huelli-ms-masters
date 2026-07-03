import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'token_blacklist' })
export class TokenBlacklist {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'jwt_id', type: 'varchar', length: 255 })
  jwt_id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  user_id!: string;

  @Column({ name: 'reason', type: 'varchar', length: 200, nullable: true })
  reason?: string;

  @Column({ name: 'expires_at', type: 'timestamp' })
  expires_at!: Date;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

}
