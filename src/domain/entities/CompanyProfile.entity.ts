import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'company_profiles' })
export class CompanyProfile {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  user_id!: string;

  @Column({ name: 'company_name', type: 'varchar', length: 250 })
  company_name!: string;

  @Column({ name: 'category_id', type: 'uuid' })
  category_id!: string;

  @Column({ name: 'verification_status_id', type: 'uuid' })
  verification_status_id!: string;

  @Column({ name: 'whatsapp', type: 'varchar', length: 30, nullable: true })
  whatsapp?: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'website', type: 'text', nullable: true })
  website?: string;

  @Column({ name: 'year_started', type: 'smallint', nullable: true })
  year_started?: number;

  @Column({ name: 'logo_url', type: 'text', nullable: true })
  logo_url?: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updated_at!: Date;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deleted_at?: Date;

}
