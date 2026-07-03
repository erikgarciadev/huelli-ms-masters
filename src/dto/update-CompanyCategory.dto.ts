import { PartialType } from '@nestjs/swagger';
import { CreateCompanyCategoryDto } from './create-CompanyCategory.dto';

export class UpdateCompanyCategoryDto extends PartialType(CreateCompanyCategoryDto) {}
