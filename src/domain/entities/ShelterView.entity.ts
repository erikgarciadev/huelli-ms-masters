import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'vw_shelters' })
export class ShelterView {
  @PrimaryColumn({ name: 'shelter_profile_id', type: 'uuid' })
  shelter_profile_id!: string;

  @Column({ name: 'shelter_name', type: 'varchar', length: 250, nullable: true })
  shelter_name?: string;

  @Column({ name: 'whatsapp', type: 'varchar', length: 30, nullable: true })
  whatsapp?: string;

  @Column({ name: 'pets_capacity', type: 'int', nullable: true })
  pets_capacity?: number;

  @Column({ name: 'foundation_year', type: 'smallint', nullable: true })
  foundation_year?: number;

  @Column({ name: 'verification_status', type: 'varchar', length: 30, nullable: true })
  verification_status?: string;

}
