import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'districts' })
export class District {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'department_id', type: 'uuid' })
  department_id!: string;

  @Column({ name: 'code', type: 'varchar', length: 20, nullable: true })
  code?: string;

  @Column({ name: 'name', type: 'text' })
  name!: string;

  @Column({ name: 'latitude', type: 'numeric', precision: 10, scale: 7, nullable: true })
  latitude?: number;

  @Column({ name: 'longitude', type: 'numeric', precision: 10, scale: 7, nullable: true })
  longitude?: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active!: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updated_at!: Date;

}
