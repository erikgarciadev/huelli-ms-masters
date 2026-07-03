import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'rescuer_profiles' })
export class RescuerProfile {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  user_id!: string;

  @Column({ name: 'whatsapp', type: 'varchar', length: 30, nullable: true })
  whatsapp?: string;

  @Column({ name: 'rescued_pets', type: 'int', default: 0 })
  rescued_pets!: number;

  @Column({ name: 'year_started', type: 'smallint', nullable: true })
  year_started?: number;

  @Column({ name: 'verification_status_id', type: 'uuid' })
  verification_status_id!: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updated_at!: Date;

}
