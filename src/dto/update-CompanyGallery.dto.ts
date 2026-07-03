import { PartialType } from '@nestjs/swagger';
import { CreateCompanyGalleryDto } from './create-CompanyGallery.dto';

export class UpdateCompanyGalleryDto extends PartialType(CreateCompanyGalleryDto) {}
