import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CompanyGallery } from '../../domain/entities/CompanyGallery.entity';
import { CompanyGalleryRepository } from '../../domain/repositories/CompanyGallery.repository';

@Injectable()
export class CompanyGalleryTypeOrmRepository implements CompanyGalleryRepository {
  constructor(
    @InjectRepository(CompanyGallery)
    private readonly repo: Repository<CompanyGallery>,
  ) {}

  findAll(): Promise<CompanyGallery[]> { return this.repo.find(); }
  findById(id: string): Promise<CompanyGallery | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<CompanyGallery>): Promise<CompanyGallery> { return this.repo.save(entity as CompanyGallery); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
