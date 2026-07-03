import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'company_locations' })
export class CompanyLocation {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'company_profile_id', type: 'uuid' })
  company_profile_id!: string;

  @Column({ name: 'name', type: 'varchar', length: 150, nullable: true })
  name?: string;

  @Column({ name: 'address', type: 'text', nullable: true })
  address?: string;

  @Column({ name: 'country_id', type: 'uuid', nullable: true })
  country_id?: string;

  @Column({ name: 'department_id', type: 'uuid', nullable: true })
  department_id?: string;

  @Column({ name: 'district_id', type: 'uuid', nullable: true })
  district_id?: string;

  @Column({ name: 'latitude', type: 'numeric', precision: 10, scale: 7, nullable: true })
  latitude?: number;

  @Column({ name: 'longitude', type: 'numeric', precision: 10, scale: 7, nullable: true })
  longitude?: number;

  @Column({ name: 'is_main', type: 'boolean', default: false })
  is_main!: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updated_at!: Date;

}
