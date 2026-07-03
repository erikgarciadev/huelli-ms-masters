import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'vw_company_locations' })
export class CompanyLocationView {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id!: string;

  @Column({ name: 'company_name', type: 'varchar', length: 250, nullable: true })
  company_name?: string;

  @Column({ name: 'branch_name', type: 'varchar', length: 150, nullable: true })
  branch_name?: string;

  @Column({ name: 'address', type: 'text', nullable: true })
  address?: string;

  @Column({ name: 'country', type: 'text', nullable: true })
  country?: string;

  @Column({ name: 'department', type: 'text', nullable: true })
  department?: string;

  @Column({ name: 'district', type: 'text', nullable: true })
  district?: string;

  @Column({ name: 'latitude', type: 'numeric', precision: 10, scale: 7, nullable: true })
  latitude?: number;

  @Column({ name: 'longitude', type: 'numeric', precision: 10, scale: 7, nullable: true })
  longitude?: number;

  @Column({ name: 'is_main', type: 'boolean', nullable: true })
  is_main?: boolean;

}
