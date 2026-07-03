import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'shelter_profiles' })
export class ShelterProfile {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  user_id!: string;

  @Column({ name: 'shelter_name', type: 'varchar', length: 250 })
  shelter_name!: string;

  @Column({ name: 'whatsapp', type: 'varchar', length: 30, nullable: true })
  whatsapp?: string;

  @Column({ name: 'pets_capacity', type: 'int', nullable: true })
  pets_capacity?: number;

  @Column({ name: 'foundation_year', type: 'smallint', nullable: true })
  foundation_year?: number;

  @Column({ name: 'verification_status_id', type: 'uuid' })
  verification_status_id!: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updated_at!: Date;

}
