import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'company_contacts' })
export class CompanyContact {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'company_profile_id', type: 'uuid' })
  company_profile_id!: string;

  @Column({ name: 'contact_name', type: 'varchar', length: 150, nullable: true })
  contact_name?: string;

  @Column({ name: 'position', type: 'varchar', length: 100, nullable: true })
  position?: string;

  @Column({ name: 'phone', type: 'varchar', length: 30, nullable: true })
  phone?: string;

  @Column({ name: 'email', type: 'text', nullable: true })
  email?: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

}
