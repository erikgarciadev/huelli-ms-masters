import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'oauth_authorization_codes' })
export class OauthAuthorizationCode {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  user_id!: string;

  @Column({ name: 'provider_id', type: 'uuid' })
  provider_id!: string;

  @Column({ name: 'code_hash', type: 'text' })
  code_hash!: string;

  @Column({ name: 'redirect_uri', type: 'text', nullable: true })
  redirect_uri?: string;

  @Column({ name: 'expires_at', type: 'timestamp' })
  expires_at!: Date;

  @Column({ name: 'consumed_at', type: 'timestamp', nullable: true })
  consumed_at?: Date;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

}
