import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'departments' })
export class Department {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'country_id', type: 'uuid' })
  country_id!: string;

  @Column({ name: 'code', type: 'varchar', length: 20, nullable: true })
  code?: string;

  @Column({ name: 'name', type: 'text' })
  name!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active!: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updated_at!: Date;

}
