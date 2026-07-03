import { CompanyGallery } from '../entities/CompanyGallery.entity';

export interface CompanyGalleryRepository {
  findAll(): Promise<CompanyGallery[]>;
  findById(id: string): Promise<CompanyGallery | null>;
  save(entity: Partial<CompanyGallery>): Promise<CompanyGallery>;
  delete(id: string): Promise<void>;
}
