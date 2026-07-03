import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'api_tokens' })
export class ApiToken {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  user_id!: string;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name!: string;

  @Column({ name: 'token_hash', type: 'text' })
  token_hash!: string;

  @Column({ name: 'scopes', type: 'text', nullable: true })
  scopes?: string;

  @Column({ name: 'expires_at', type: 'timestamp', nullable: true })
  expires_at?: Date;

  @Column({ name: 'revoked_at', type: 'timestamp', nullable: true })
  revoked_at?: Date;

  @Column({ name: 'last_used_at', type: 'timestamp', nullable: true })
  last_used_at?: Date;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

}
