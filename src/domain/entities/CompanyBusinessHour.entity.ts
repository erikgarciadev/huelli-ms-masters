import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'company_business_hours' })
export class CompanyBusinessHour {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'company_location_id', type: 'uuid' })
  company_location_id!: string;

  @Column({ name: 'day_of_week', type: 'smallint' })
  day_of_week!: number;

  @Column({ name: 'open_time', type: 'time' })
  open_time!: string;

  @Column({ name: 'close_time', type: 'time' })
  close_time!: string;

  @Column({ name: 'is_closed', type: 'boolean', default: false })
  is_closed!: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

}
