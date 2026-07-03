import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'company_categories' })
export class CompanyCategory {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'code', type: 'varchar', length: 30 })
  code!: string;

  @Column({ name: 'name', type: 'varchar', length: 150 })
  name!: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'icon', type: 'varchar', length: 250, nullable: true })
  icon?: string;

  @Column({ name: 'color', type: 'varchar', length: 20, nullable: true })
  color?: string;

  @Column({ name: 'sort_order', type: 'int', nullable: true, default: 0 })
  sort_order?: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active!: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updated_at!: Date;

}
