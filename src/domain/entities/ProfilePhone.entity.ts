import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'profile_phones' })
export class ProfilePhone {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_profile_id', type: 'uuid' })
  user_profile_id!: string;

  @Column({ name: 'phone_type', type: 'varchar', length: 30, nullable: true })
  phone_type?: string;

  @Column({ name: 'country_code', type: 'varchar', length: 5, nullable: true })
  country_code?: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 30 })
  phone_number!: string;

  @Column({ name: 'is_primary', type: 'boolean', default: false })
  is_primary!: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

}
