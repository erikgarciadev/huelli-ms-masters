import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'role_id', type: 'uuid' })
  role_id!: string;

  @Column({ name: 'status_id', type: 'uuid' })
  status_id!: string;

  @Column({ name: 'primary_email', type: 'text' })
  primary_email!: string;

  @Column({ name: 'email_verified', type: 'boolean', default: false })
  email_verified!: boolean;

  @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
  last_login_at?: Date;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updated_at!: Date;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deleted_at?: Date;

}
