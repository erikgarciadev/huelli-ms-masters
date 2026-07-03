import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'vw_companies' })
export class CompanyView {
  @PrimaryColumn({ name: 'company_profile_id', type: 'uuid' })
  company_profile_id!: string;

  @Column({ name: 'company_name', type: 'varchar', length: 250, nullable: true })
  company_name?: string;

  @Column({ name: 'category', type: 'varchar', length: 150, nullable: true })
  category?: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'website', type: 'text', nullable: true })
  website?: string;

  @Column({ name: 'whatsapp', type: 'varchar', length: 30, nullable: true })
  whatsapp?: string;

  @Column({ name: 'logo_url', type: 'text', nullable: true })
  logo_url?: string;

  @Column({ name: 'verification_status', type: 'varchar', length: 30, nullable: true })
  verification_status?: string;

  @Column({ name: 'primary_email', type: 'text', nullable: true })
  primary_email?: string;

  @Column({ name: 'profile_photo_url', type: 'text', nullable: true })
  profile_photo_url?: string;

}
