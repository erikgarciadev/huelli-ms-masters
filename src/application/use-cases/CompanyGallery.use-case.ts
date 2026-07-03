import { CompanyGallery } from '../../domain/entities/CompanyGallery.entity';
import { CompanyGalleryRepository } from '../../domain/repositories/CompanyGallery.repository';

export class CompanyGalleryUseCase {
  constructor(private readonly repo: CompanyGalleryRepository) {}

  findAll(): Promise<CompanyGallery[]> { return this.repo.findAll(); }
  findById(id: string): Promise<CompanyGallery | null> { return this.repo.findById(id); }
  create(data: Partial<CompanyGallery>): Promise<CompanyGallery> { return this.repo.save(data); }
  update(id: string, data: Partial<CompanyGallery>): Promise<CompanyGallery> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
