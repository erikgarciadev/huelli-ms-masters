import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'company_gallery' })
export class CompanyGallery {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'company_profile_id', type: 'uuid' })
  company_profile_id!: string;

  @Column({ name: 'image_url', type: 'text' })
  image_url!: string;

  @Column({ name: 'title', type: 'varchar', length: 150, nullable: true })
  title?: string;

  @Column({ name: 'sort_order', type: 'int', nullable: true, default: 0 })
  sort_order?: number;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  created_at!: Date;

}
