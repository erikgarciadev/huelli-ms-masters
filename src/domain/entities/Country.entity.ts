import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'iso2', type: 'char', length: 2 })
  iso2!: string;

  @Column({ name: 'iso3', type: 'char', length: 3, nullable: true })
  iso3?: string;

  @Column({ name: 'numeric_code', type: 'varchar', length: 5, nullable: true })
  numeric_code?: string;

  @Column({ name: 'name', type: 'text' })
  name!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active!: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updated_at!: Date;

}
