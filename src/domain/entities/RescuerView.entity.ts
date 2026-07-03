import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'vw_rescuers' })
export class RescuerView {
  @PrimaryColumn({ name: 'rescuer_profile_id', type: 'uuid' })
  rescuer_profile_id!: string;

  @Column({ name: 'full_name', type: 'varchar', length: 150, nullable: true })
  full_name?: string;

  @Column({ name: 'community_alias', type: 'text', nullable: true })
  community_alias?: string;

  @Column({ name: 'whatsapp', type: 'varchar', length: 30, nullable: true })
  whatsapp?: string;

  @Column({ name: 'rescued_pets', type: 'int', nullable: true })
  rescued_pets?: number;

  @Column({ name: 'year_started', type: 'smallint', nullable: true })
  year_started?: number;

  @Column({ name: 'verification_status', type: 'varchar', length: 30, nullable: true })
  verification_status?: string;

  @Column({ name: 'profile_photo_url', type: 'text', nullable: true })
  profile_photo_url?: string;

}
